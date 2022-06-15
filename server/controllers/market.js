import Market from '../models/market.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    const {page, search, category: categories, suits, condition} = req.query;
    try{
        const LIMIT = 12;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Market.countDocuments({});

        
        const srch = new RegExp(search, 'i');
        const suitsRE = new RegExp(suits, 'i');
        const conditionRE = new RegExp(condition, 'i');
        if(categories.length>0){
            const posts = await Market.find({$or: [{title: srch}, {description: srch}], suits: suitsRE,condition: conditionRE, category: {$in: categories.split(',')}}).limit(LIMIT).skip(startIndex);
            return res.status(200).json({data: posts, currentpage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }
        const posts = await Market.find({$or: [{title: srch}, {description: srch}], suits: suitsRE,condition: conditionRE}).limit(LIMIT).skip(startIndex);
        return res.status(200).json({data: posts, currentpage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}
export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Market.findById(id)
            .populate({
                path: 'author',
                select: 'avatar firstname lastname'
            });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const createPost = async (req, res) => {
    if(!req.userId) return res.json({message: "Unaithenticated"});
    const post = req.body;
    try {
        const newPost = new Market({...post, author: req.userId});
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({error});
    }
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No product post with that Id");

    const post = await Market.findById(_id);
    if(!!post && !!post.author && String(post.author) === String(req.userId)){
        await Market.findByIdAndRemove(_id);
        return res.json({message: 'Product post deleted successfully'});
    }else{
        return res.status(404).json({message: 'No authority'});
    }
};
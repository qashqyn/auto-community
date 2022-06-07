import mongoose from "mongoose";
import AntitheftMessage from "../models/antitheftMessage.js";

export const getPosts = async (req, res) => {
    const {city, sort, amount, page} = req.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await AntitheftMessage.countDocuments({});

        const location = new RegExp(city, 'i');
        const sorting = sort === "new" ? '-createdAt' : 'createdAt';

        const antitheftMessages = await AntitheftMessage.find({location}).where("status").equals("approved").where("amount").gte(amount).sort(sorting).limit(LIMIT).skip(startIndex);
        
        res.status(200).json({data: antitheftMessages, currentPage:Number(page), numberOfpages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await AntitheftMessage.findById(id)
            .populate({
                path: 'author',
                select: 'avatar firstname lastname tel'
            });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};


export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No antitheft post with that Id");
 
    const post = await AntitheftMessage.findById(_id);
  
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await AntitheftMessage.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);
};

export const createPost = async (req, res) => {
    if(!req.userId) return res.json({message: "Unaithenticated"});
    const post = req.body;
    try {
        const newPost = new AntitheftMessage({...post, author: req.userId});
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(409).json({error});
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No antitheft post with that Id");

    const updatedPost = await AntitheftMessage.findByIdAndUpdate(_id, { ...post, _id}, {new: true});

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.status(403).json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No antitheft post with that Id");

    const post = await AntitheftMessage.findById(_id);
    if(!!post && !!post.author && String(post.author) === String(req.userId)){
        await AntitheftMessage.findByIdAndRemove(_id);
        return res.json({message: 'Antitheft post deleted successfully'});
    }else{
        return res.status(404).json({message: 'No authority'});
    }
};
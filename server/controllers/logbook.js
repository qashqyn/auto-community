import mongoose from 'mongoose';
import LogbookMessage from '../models/logbookMessage.js';

export const getPosts = async (req, res) => {
    try{
        const logbooks = await LogbookMessage.find().select('title message author likes').populate({
            path: 'author',
            select: 'firstname lastname avatar car'
        }).sort('-createdAt');

        res.status(200).json({data: logbooks, currentPage: 0, numberofPages: 0});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}
export const getPostsByCategory = async (req, res) => {
    const { category: categories } = req.query;
    try{
        const logbooks = await LogbookMessage.find({category: { $in: categories.split(',')}}).sort('-createdAt');

        res.status(200).json({data: logbooks, currentPage: 0, numberofPages: 0});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}


export const createPost = async (req, res) => {
    if(!req.userId) return res.json({message: 'Unaithenticated'});
    const post = req.body;
    try{
        const logbook = new LogbookMessage({...post, author: req.userId});
        await logbook.save();

        res.status(201).json(logbook);
    }catch(error){
        console.log(error);
        res.status(409).json(error.message);
    }
}

export const getLogbook = async (req,res) => {
    const { id } = req.params;
    try {
        const data = await LogbookMessage.findById(id)
            .populate({
                path:'author',
                select: 'firstname lastname avatar'
            });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const getUserLogbooks = async (req, res) => {
    if(!req.userId) return res.json({message: 'Unaithenticated'});
    try{
        const logbooks = await LogbookMessage.find({'author': req.userId}).sort('-createdAt');

        res.status(200).json({data: logbooks, currentPage: 0, numberofPages: 0});
    }catch(error){
        console.log(error);
        res.status(404).json({message: error.message});
    }
}

export const deleteLogbook = async (req, res) => {
    if(!req.userId) return res.json({messsage: 'Unaithenticated'});
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No logbook with that Id");

    await LogbookMessage.findByIdAndRemove(id);

    res.json({message: 'Logbook deleted successfully'});
}
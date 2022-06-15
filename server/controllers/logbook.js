import mongoose from 'mongoose';
import LogbookMessage from '../models/logbookMessage.js';
import UserModal from '../models/user.js';
import LogbookComments from '../models/logbookComment.js';

export const getPosts = async (req, res) => {
    const { search } = req.query;
    try{
        const srch = new RegExp(search, 'i');

        const logbooks = await LogbookMessage.find({$or: [{title: srch}, {message: srch}]}).select('title message author likes').populate({
            path: 'author',
            select: 'firstname lastname avatar cars'
        }).populate({
            path: 'comments',
            select: '-logbook',
            options:{ sort: '-date' },
            populate: {path: 'user', select: 'avatar'}
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
        const logbooks = await LogbookMessage.find({category: { $in: categories.split(',')}}).select('title message author likes').populate({
            path: 'author',
            select: 'firstname lastname avatar cars'
        }).sort('-createdAt');

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
                select: 'firstname lastname avatar cars'
            }).populate({
                path: 'comments',
                select: '-logbook',
                options:{ sort: '-date' },
                populate: {path: 'user', select: 'firstname lastname cars avatar'}
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

export const likeLogbook = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No logbook with that Id");
 
    const logbook = await LogbookMessage.findById(_id);
    const user = await UserModal.findById(req.userId).select('likedLogbooks');

    let likes = logbook.likes;
    let likedLogbook = user.likedLogbooks; 

    const index = likes.findIndex((id) => String(id) === String(req.userId));
    const indexUser = likedLogbook.findIndex((id) => String(id) === String(_id));


    if(index === -1){
        likes.push(req.userId);
    }else{
        likes = likes.filter((id) => String(id) !== String(req.userId));
    }
    const updatedLogbook = await LogbookMessage.findByIdAndUpdate(_id, {likes: likes}, {new: true}).select('likes');
    
    if(indexUser === -1){
        likedLogbook.push(_id);
    }else{
        likedLogbook = likedLogbook.filter((id) => String(id) !== String(_id));
    }
    await UserModal.findByIdAndUpdate(req.userId, {likedLogbooks: likedLogbook}, {new: true});
    return res.json(updatedLogbook);
}

export const getLikes = async (req, res) => {
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("No logbook with that Id");
        const logbook = await LogbookMessage.findById(_id).select('likes');
        return res.json(logbook.likes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}

export const commentLogbook = async (req, res) => {
    const { id: _id } = req.params;
    const comment = req.body;

    try {
        if(!req.userId) return res.json({message: "Unaithenticated"});
        
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No logbook with that Id");

        const logbookComment = new LogbookComments({...comment, logbook: _id, user: req.userId});
        await logbookComment.save();
        const logbook = await LogbookMessage.findById(_id);
        logbook.comments.push(logbookComment._id);
        const updatedLogbook = await LogbookMessage.findByIdAndUpdate(_id, {comments: logbook.comments}, {new: true}).select('comments').populate({
            path: 'comments',
            select: '-logbook',
            options:{ sort: '-date' },
            populate: {path: 'user', select: 'firstname lastname cars avatar'}
        });
         
        return res.json(updatedLogbook);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}
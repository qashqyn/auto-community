import NewsMessage from "../models/newsMessage.js";
import NewsComment from "../models/newsComment.js";
import UserModal from "../models/user.js";
import mongoose from "mongoose";


export const getNews = async (req, res) => {
    const { tags, page } = req.query;
    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await NewsMessage.countDocuments({});

        if(tags.length>0){
            const newsMessages = await NewsMessage.find({tag: { $in: tags.split(',')}}).select('title description tags selectedFile createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: newsMessages, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }else{
            const newsMessages = await NewsMessage.find().select('title description tags selectedFile createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: newsMessages, currentPage:Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        }
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const getSingleNews = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await NewsMessage.findById(id)
            .populate({
                path: 'comments',
                select: '-news',
                options:{ sort: '-date' },
                populate: {path: 'user', select: 'firstname lastname car avatar'}
            });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};


export const likeNews = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");
 
    const news = await NewsMessage.findById(_id);
    const user = await UserModal.findById(req.userId).select('likedNews');

    let likes = news.likes;
    let likedNews = user.likedNews; 

    const index = likes.findIndex((id) => String(id) === String(req.userId));
    const indexUser = likedNews.findIndex((id) => String(id) === String(_id));


    if(index === -1){
        likes.push(req.userId);
    }else{
        likes = likes.filter((id) => String(id) !== String(req.userId));
    }
    const updatedNews = await NewsMessage.findByIdAndUpdate(_id, {likes: likes}, {new: true});
    
    if(indexUser === -1){
        likedNews.push(_id);
    }else{
        likedNews = likedNews.filter((id) => String(id) !== String(_id));
    }
    await UserModal.findByIdAndUpdate(req.userId, {likedNews: likedNews}, {new: true});
    return res.json(updatedNews.likes);
}

export const commentNews = async (req, res) => {
    const { id: _id } = req.params;
    const comment = req.body;

    try {
        if(!req.userId) return res.json({message: "Unaithenticated"});
        
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No news with that Id");

        const newComment = new NewsComment({...comment, news: _id, user: req.userId});
        await newComment.save();
        const news = await NewsMessage.findById(_id);
        news.comments.push(newComment._id);
        const updatedNews = await NewsMessage.findByIdAndUpdate(_id, {comments: news.comments}, {new: true});
         
        return res.json(updatedNews);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}
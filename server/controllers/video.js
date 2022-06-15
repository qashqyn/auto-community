import mongoose from "mongoose";
import Video from "../models/video.js";
import VideoComment from '../models/videoComment.js';
import UserModal from '../models/user.js';

export const getVideos = async (req, res) => {
    const { tags, page } = req.query;
    try {
        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Video.countDocuments({});

        if(tags.length>0){
            const videos = await Video.find({tag: { $in: tags.split(',')}}).select('title videoID createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: videos, currentPage:Number(page), numberOfPages: Number(Math.ceil(total / LIMIT))});
        }else{
            const videos = await Video.find().select('title tag videoID createdAt').sort({createdAt: -1}).limit(LIMIT).skip(startIndex);
            res.status(200).json({data: videos, currentPage:Number(page), numberOfPages: Number(Math.ceil(total / LIMIT))});
        }
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
};

export const getVideo = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Video.findById(id).populate({
            path: 'comments',
            select: '-video',
            options:{ sort: '-date' },
            populate: {path: 'user', select: 'firstname lastname cars avatar'}
        });
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});      
    }
};

export const getRelatedVideos = async (req, res) => {
    const {id, count} = req.query;
    try {
        const data = await Video.find({ _id: { $nin: [mongoose.Types.ObjectId(id)] } }).select('title videoID createdAt').limit(count);

        return res.status(200).json({related: data, videoCount: count});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}


export const likeVideo = async (req, res) => {
    const { id: _id } = req.params;

    if(!req.userId) return res.json({message: "Unaithenticated"});

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No video with that Id");
 
    const video = await Video.findById(_id);
    const user = await UserModal.findById(req.userId).select('likedVideo');

    let likes = video.likes;
    let likedVideo = user.likedVideo; 
  
    const index = video.likes.findIndex((id) => String(id) === String(req.userId));
    const indexUser = likedVideo.findIndex((id) => String(id) === String(_id));

    if(index === -1){
        likes.push(req.userId);
    }else{
        likes = likes.filter((id) => String(id) !== String(req.userId));
    }
    const updatedVideo = await Video.findByIdAndUpdate(_id, {likes: likes}, {new: true}).select('likes');

    if(indexUser === -1){
        likedVideo.push(_id);
    }else{
        likedVideo = likedVideo.filter((id) => String(id) !== String(_id));
    }
    await UserModal.findByIdAndUpdate(req.userId, {likedVideo: likedVideo}, {new: true});
    return res.json(updatedVideo);
}

export const commentVideo = async (req, res) => {
    const { id: _id } = req.params;
    const comment = req.body;

    try {
        if(!req.userId) return res.json({message: "Unaithenticated"});
        
        if(!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No video with that Id");

        const videoComment = new VideoComment({...comment, video: _id, user: req.userId});
        await videoComment.save();
        const video = await Video.findById(_id);
        video.comments.push(videoComment._id);
        const updatedVideo = await Video.findByIdAndUpdate(_id, {comments: video.comments}, {new: true}).select('comments').populate({
            path: 'comments',
            select: '-video',
            options:{ sort: '-date' },
            populate: {path: 'user', select: 'firstname lastname cars avatar'}
        });
         
        return res.json(updatedVideo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"});
    }
}
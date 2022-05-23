import mongoose from "mongoose";
import NewsMessage from "../models/newsMessage.js";
import Video from "../models/video.js";
import AntitheftMessage from "../models/antitheftMessage.js";


// NEWS
export const createNews = async (req, res) => {
    const news = req.body;
    const newNews = new NewsMessage(news);
    
    try {
        await newNews.save();
        
        res.status(201).json(newNews);
    } catch (error) {
        res.status(409).json({error});
    }
};

export const updateNews = async (req, res) => {
    const { id: _id } = req.params;
    const news = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");

    const updatedNews = await NewsMessage.findByIdAndUpdate(_id, { ...news, _id}, {new: true});

    res.json(updatedNews);
};

export const deleteNews = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No news with that Id");

    await NewsMessage.findByIdAndRemove(_id);

    res.json({message: 'News deleted successfully'});
};

// VIDEO
export const createVideo = async (req, res) => {
    const video = req.body;
    const newVideo = new Video(video);
    
    try {
        await newVideo.save();
        
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(409).json({error});
    }
};

export const updateVideo = async (req, res) => {
    const { id: _id } = req.params;
    const video = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No video with that Id");

    const updatedVideo = await NewsMessage.findByIdAndUpdate(_id, { ...video, _id}, {new: true});

    res.json(updatedVideo);
};

export const deleteVideo = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No video with that Id");

    await Video.findByIdAndRemove(_id);

    res.json({message: 'Video deleted successfully'});
};

// ANTITHEFT
export const getAntitheftPosts = async (req, res) => {
    const {status} = req.query;
    try {
        if(!!status && status.length>0){
            const antitheftMessages = await AntitheftMessage.find().where('status').equals(status).select('mark model releaseYear createdAt status').sort('createdAt');
            res.status(200).json({data: antitheftMessages});
        }else{
            const antitheftMessages = await AntitheftMessage.find().select('mark model releaseYear createdAt status').sort('createdAt');
            res.status(200).json({data: antitheftMessages});
        }
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
}

export const setAntitheftStatus = async (req, res) => {
    const {status: newStatus} = req.query;
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("No post with that Id");

        await AntitheftMessage.findByIdAndUpdate(id, {status: newStatus}, {new: true});
        res.status(204).json({message: "success"});
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
}
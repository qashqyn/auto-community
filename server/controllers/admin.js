import mongoose from "mongoose";
import NewsMessage from "../models/newsMessage.js";

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
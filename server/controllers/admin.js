import mongoose from "mongoose";
import NewsMessage from "../models/newsMessage.js";
import Video from "../models/video.js";
import AntitheftMessage from "../models/antitheftMessage.js";
import CarModel from "../models/carModel.js";
import nodemailer from 'nodemailer';
import UserModal from '../models/user.js';

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

        const post = await AntitheftMessage.findByIdAndUpdate(id, {status: newStatus}, {new: true});

        const user = await UserModal.findById(post.author).select('email');


        const transporter = nodemailer.createTransport({
            port: 465,   
            host: "smtp.gmail.com",
            auth: {
              user: 'autocommunity.web@gmail.com',
              pass: 'bqguieeydlumwsng'
            },
            secure: true,
        });

        if(newStatus === 'approved' || newStatus === 'dismissed'){
            let mailText = '';
    
            switch(newStatus){
                case 'approved':
                    mailText = 'Мы одобрили вашу заявку на антиугон. Вы можете посмотреть его в своем профиле!'
                    break;
                case 'dismissed':
                    mailText = 'К сожелению ваша заявка на антиугон была отказана. ';
                    break;
            }
    
            var mailOptions = {
                from: 'autocommunity.web@gmail.com',
                to: user.email,
                subject: 'Заявка на антиугон',
                text: mailText
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    return res.status(400).json({message: "Error"});
                }
                return res.status(204).json({message: "Success"});
            });
        }


        res.status(204).json({message: "success"});
    } catch (error) {
        res.status(404).json({message: error.message});      
    }
}

// CAR MODELS
export const addCarModel = async (req, res) => {
    const data = req.body;
    try {
        let exists = await CarModel.findOne({mark: data.mark});

        if(exists === null){
            const newCar = new CarModel({mark: data.mark, models: [{name: data.model, generations: [data.generation]}]});
            await newCar.save();
        }else{
            let modelExists = null;
            let index = null;
            exists.models.map((model, key) => {
                if(model.name === data.model){
                    modelExists = model;
                    index = key;
                }
            });
            if(modelExists === null) {
                exists.models.push({name: data.model, generations: [data.generation]});
                await CarModel.findByIdAndUpdate(exists._id, {models: exists.models});
            }else{
                let genExists = null;
                modelExists.generations.map((gen)=>{
                    if(gen === data.generation)
                        genExists = gen;
                });
                if(genExists === null){
                    exists.models[index].generations.push(data.generation);
                    await CarModel.findByIdAndUpdate(exists._id, {models: exists.models});
                }
            }
        }

        const cars = await CarModel.find();

        return res.json(cars);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getCarModels = async (req, res) => {
    try {
        const cars = await CarModel.find();

        return res.json(cars);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}
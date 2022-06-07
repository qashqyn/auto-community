import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import UserModal from "../models/user.js";
import nodemailer from 'nodemailer';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModal.findOne({email});
        
        if(!existingUser) return res.status(404).json({message: "User does not exist."});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Somethinggg went wrong."});
    }
};

export const signup = async (req, res) => {
    const {email, password, firstname, lastname, tel, country, city, car} = req.body;
    
    
    try {
        const existingUser = await UserModal.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists."});
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({email, password: hashedPassword, firstname, lastname, tel, country, city, car});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
        
        res.status(201).json({result, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong."});
    }
};

export const updateUser = async (req, res) => {
    const userData = req.body;

    try{
        if(!req.userId) return res.json({message: "Unaithenticated"});
        const _id = req.userId;

        const result = await UserModal.findByIdAndUpdate(_id, { ...userData, _id}, {new: true});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
        
        return res.json({ result, token});
    } catch (error) {
        console.log(error);

        return res.status(500).json({message: "Something went wrong."});
    }
};

export const resetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await UserModal.findOne({email: email});
        if(!user)
            return res.status(404).json({message: "User does not exist."});

        const link = jwt.sign({id: user._id}, 'reset_password', { expiresIn: "10h"});

        const transporter = nodemailer.createTransport({
            port: 465,   
            host: "smtp.gmail.com",
            auth: {
              user: 'qashqyn291@gmail.com',
              pass: 'Or@lmaQashqyn'
            },
            secure: true,
        });

        var mailOptions = {
            from: 'qashqyn291@gmail.com',
            to: user.email,
            subject: 'Востановление паролья',
            text: `Чтобы востановить пароль перейдите по ссылке: http://localhost:3000/login/reset/${link}`
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                return res.status(400).json({message: "Error"});
            }
            return res.status(201).json({message: "Success"});
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({message: "Something went wrong."});
    }
}

export const changePassword = async (req,res) => {
    const { token, password } = req.body;
    try {
        const {id} = jwt.verify(token, 'reset_password');

        const existingUser = await UserModal.findById(id);
        
        if(!existingUser) return res.status(404).json({message: "User does not exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(isPasswordCorrect) return res.status(401).json({message: "Passwords are same"});

        const hashedPassword = await bcrypt.hash(password, 12);
        
        await UserModal.findByIdAndUpdate(id, {password: hashedPassword});
        
        return res.status(201).json({message: "Success"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong."});
    }
}

export const getLikedPosts = async (req, res) => {
    try {
        if(!req.userId) return res.json({message: "Unaithenticated"});
        const _id = req.userId;

        const data = await UserModal.findById(_id).select('likedNews, likedLogbooks').populate({
            path: 'likedNews',
            select: 'title description tags selectedFile createdAt',
        }).populate({
            path: 'likedLogbooks',
            select: 'title message createdAt category',
        });

        return res.json(data);

    } catch (error) {
        console.log(error);

        return res.status(500).json({message: "Something went wrong."});
    }
}
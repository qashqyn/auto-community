import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import UserModal from "../models/user.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);
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
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
};

export const updateUser = async (req, res) => {
    const userData = req.body;

    try{
        if(!req.userId) return res.json({message: "Unaithenticated"});
        const _id = req.userId;

        const result = await UserModal.findByIdAndUpdate(_id, { ...userData, _id}, {new: true});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
        
        res.json({ result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
};
import express from "express";
import user from "../models/user.js";
import bcrypt from "bcrypt";

const app=express();

export const registerUser = async (req,res) =>{
    try{
    const req_user=req.body;
    console.log(req_user)
    if(!req_user){
        return res.status(400).json({message:'recived nothing please provide username,email and password'})
    }
    req_user.password=await bcrypt.hash(req_user.password,10)
    await user.create({
        ...req_user
    })
    res.status(201).json({message:'user registered'})
}
catch(err){
    return res.status(500).json({error:err})
}
}

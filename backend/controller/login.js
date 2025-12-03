import sequelize from "../config/db.js";
import express from "express";
import user from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Op } from "sequelize";


const app=express()

export const loginUser = async (req,res) =>{
    console.log(req.body)
    try{
    const user_req=req.body;
    if(!user_req){
        return res.status(400).json({badRequest:'please provide email/username password'})
    }
    const db_user=await user.findOne({where:{[Op.or]:[{user_name:user_req.username},{email:user_req.username}]}})
    if(!db_user){
        return res.status(400).json({badRequest:'no  user found with username and email provided'})
    }
    const pass_hash=await bcrypt.hash(user_req.password,10)
    const result=await bcrypt.compare(user_req.password,db_user.password)
    if(!result){
        return res.status(400).json({invalidPassword:'wrong password'})
    }
    
    const token=jwt.sign({id:user_req.user_id},process.env.JWT_SECRET,{expiresIn:"1h"})
    res.status(200).json({message:'welcome',token:token})
}
catch(err){
    console.log(err)
    return res.status(500).json({error:'this is error',err})
}

}


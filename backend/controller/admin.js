import express from "express"
import user from "../models/user.js"
import items from "../models/items.js"
import invoice from "../models/invoice.js"

export const userList = async (req,res)=>{
    const users=await user.findAll();
    if(!users){
        res.status(400).json({message:'No user found'})
    }
    res.status(200).json({users})
}
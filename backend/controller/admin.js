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
export const userDelete = async (req,res)=>{
    console.log(req.body)
    try{
    const userId=req.body.user_id;
    if(!userId){
      return  res.status(400).json({message:'user id not found '})
    }
    await user.destroy({where:{user_id:userId}})
    await invoice.destroy({where:{user_id:null}})
    await items.destroy({where:{invoiceId:null}})

    res.status(200).json("delete sucessfull")
}catch(err){
    console.log(err)
    return res.status(400).json({err})
}
}
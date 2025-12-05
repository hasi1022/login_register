import express from "express"
import jwt from "jsonwebtoken"
const app=express();
import {invoice,items,user} from "../models/merge.js";


export const createInvoice = async (req,res) =>{
    console.log(req.body)
    try{
    
    const val=req.body;
    let item=val.items;
    const user_login=req.user.id;
    console.log(user_login)
    let grandtotal=0;
    for (let i of item){
         i.itemSubUnitTotal=(i.itemQuantity*i.itemUnitPrice)
         i.itemGst=(0.18*i.itemSubUnitTotal)
         grandtotal+=i.itemSubUnitTotal;
    }
    const invoice_latest=await invoice.create({
        billTo:val.billTo,
        invoiceDate:val.invoiceDate,
        grandTotal:grandtotal,
        invoiceDate:val.invoiceDate,
        user_id:user_login
    })
    for(let i of item){
        i.invoiceId=invoice_latest.invoiceId;
    }
    await items.bulkCreate(item)
    res.status(200).json({message:"created succesfully"})
}
catch(err){
    console.log(err)
    return res.status(500).json({message:'create unsuccessful'})
}
    
}
export const getInvoice = async (req,res) =>{
    try{
    const req_id=req.params.id;
    const invoice_result=await invoice.findAll({
        where:{user_id:req_id},include:[{
            model:items,
            as:'items'
        }]
    }) 
    if(!invoice_result){
        return res.status(400).JSON({message:'no Invoice with this id found'})
    }
    res.status(200).json({message:invoice_result})
}
catch(err){
    console.log(err)
    return res.status(500).json({message:'did not get company'})
}
}
export const updateInvoice = async (req,res) =>{
    try{
    const update_id=req.params.id;
    const update_result=req.body;
    console.log(update_result)
    const user_login=req.user.id;
    let item =JSON.parse(update_result.items)
    let grandtotal=0;
    for (let i of item){
         i.itemSubUnitTotal=(i.itemQuantity*i.itemUnitPrice)
         i.itemGst=(0.18*i.itemSubUnitTotal)
         grandtotal+=i.itemSubUnitTotal;
    }
    const invoice_latest=await invoice.update({
        billTo:update_result.billTo,
        invoiceDate:update_result.invoiceDate,
        grandTotal:grandtotal,
        invoiceDate:update_result.invoiceDate,
        user_id:user_login
    },{where:{invoiceId:update_id}})
    for(let i of item){
        i.invoiceId=update_id;
    }
    await items.bulkCreate(item,{updateOnDuplicate:['itemName','itemQuantity', 'itemUnitPrice', 'itemSubUnitTotal', 'itemGst']})
    res.status(200).json({message:"created succesfully"})
}
catch(err){
    console.log(err)
    return res.status(500).json({message:'update unsuccessful'})
}
}
export const deleteInvoice = async (req,res) =>{
     try{
      const del_id=req.params.id;
      if(!del_id){
        return res.status(400).json({message:'id not provided please provide id'})
      }
      await items.destroy({where:{invoiceId:del_id}})
      await invoice.destroy({where:{invoiceId:del_id}})
      res.status(202).json({message:'Delete Successful'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'delete unsuccessful'})
    }
}
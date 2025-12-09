import joi from "joi";
import items from "../models/items.js";
export const registerUserValid=joi.object({
    user_name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).max(10).required()
})
export const loginUserValid=joi.object({
    username:joi.string().required(),
    password:joi.string().required()
})
const itemInvoice=joi.object({
    
    itemName:joi.string().required(),
    itemQuantity:joi.number().required(),
    itemUnitPrice:joi.number().required(),
    itemGstPer:joi.number().required(),
    itemGst:joi.number().required(),
    itemSubUnitTotal:joi.number().required(),
})
export const creInvoice=joi.object({
        billTo:joi.string().required(),
        invoiceDate:joi.string().isoDate().required(),
        grandTotal:joi.number().required(),
        items:joi.array().items(itemInvoice).required(),

})
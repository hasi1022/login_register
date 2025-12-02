import joi from "joi";
export const registerUserValid=joi.object({
    user_name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).max(10).required()
})
export const loginUserValid=joi.object({
    username:joi.string().required(),
    password:joi.string().required()
})
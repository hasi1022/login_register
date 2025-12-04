import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
export async function authentication(req,res,next){
   try{
    const sub_token=req.headers.authorization;
    const token=sub_token.slice(7,)
    const result=jwt.verify(token,process.env.JWT_SECRET)
    if(!result){
        return res.status(400).json({message:'authentication failed'})
    }
    req.user=result;
    console.log(result)
    next();
   }
   catch(err){
    return res.status(500).json({message:'authentication Error'})
   }
}
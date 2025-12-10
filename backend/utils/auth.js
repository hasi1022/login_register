import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
export async function authentication(req,res,next){

    console.log(req.headers.authorization)
   try{
    const sub_token=req.headers.authorization;
    console.log(sub_token)
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
    console.log(err)
    return res.status(500).json({message:'authentication Error'})
   }
}
export async function authenticationAdmin(req,res,next){
    const sub_token=req.headers.authorization;
    console.log(sub_token)
    const token=sub_token.slice(7,)
    const result=jwt.verify(token,process.env.JWT_SECRET)
    console.log(result)
    if(result){
        if(result.role==="admin"){
            req.user=result;
            next();
        }
        else{
            return res.status(400).json({message:'access denied'})
        }
    }
    else{
        return res.status(400).json({message:'Authentication Filed'})
    }
}
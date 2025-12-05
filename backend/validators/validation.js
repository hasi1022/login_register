export const validation = (schema) =>{
    return(req,res,next)=>{
         if(req.body.items && typeof(req.body.items)=="string"){
            req.body.items=JSON.parse(req.body.items)
         }
         const {error,value}=schema.validate(req.body)
         if(error){
            return res.status(400).json({message:error.details[0].message})
         }
         else{
            next();
         }
    }
}
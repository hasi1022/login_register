
import express from "express";
import sequelize from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/router.js";
import multer from "multer";
import './models/merge.js'
const upload=multer();

const app=express();
app.use(upload.none())
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/task',router)
sequelize.sync({alter:true}).then(()=>{
    console.log("connected to database")
    app.listen(8000,()=>{
        console.log("server started")
    })
})
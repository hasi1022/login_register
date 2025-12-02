
import express from "express";
import sequelize from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import router from "./routes/router.js";
const app=express();
app.use(express.json())
app.use(cors())
app.use('/task',router)
sequelize.sync().then(()=>{
    console.log("connected to database")
    app.listen(8000,()=>{
        console.log("server started")
    })
})
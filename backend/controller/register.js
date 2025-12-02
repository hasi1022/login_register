import express from "express";
import user from "../models/user.js";

const app=express();

export const registerUser = async (req,res) =>{
    res.end("hello from register")
}
export const loginUser = async (req,res) =>{
    res.end("hello this is login page ")
}
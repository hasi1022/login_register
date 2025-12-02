import express from "express"
import { registerUser } from "../controller/register.js"
import { loginUser } from "../controller/register.js"
const router=express.Router()

router.get('/register',registerUser)
router.get('/login',loginUser)

export default router

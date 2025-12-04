import express from "express"
import { registerUser } from "../controller/register.js"
import { loginUser } from "../controller/login.js"
import { registerUserValid } from "../validators/validationModel.js"
import { loginUserValid } from "../validators/validationModel.js"
import { validation } from "../validators/validation.js"
import { createInvoice } from "../controller/crudInvoice.js"
import { authentication } from "../utils/auth.js"
import { getInvoice } from "../controller/crudInvoice.js"
const router=express.Router()

router.post('/register',validation(registerUserValid),registerUser)
router.post('/login',validation(loginUserValid),loginUser)
router.post('/createinvoice',authentication,createInvoice)
// router.get('/getinvoice/:id',getInvoice)

export default router

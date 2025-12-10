import express from "express"
import { registerUser } from "../controller/register.js"
import { loginUser } from "../controller/login.js"
import { registerUserValid } from "../validators/validationModel.js"
import { loginUserValid } from "../validators/validationModel.js"
import { validation } from "../validators/validation.js"
import { authentication,authenticationAdmin } from "../utils/auth.js"
import { creInvoice } from "../validators/validationModel.js"
import { updateInvoice,deleteInvoice,getInvoice,createInvoice,getInvoiceUpdate } from "../controller/crudInvoice.js"
import { userList } from "../controller/admin.js"

const router=express.Router()

router.post('/register',validation(registerUserValid),registerUser)
router.post('/login',validation(loginUserValid),loginUser)
router.post('/createinvoice',authentication,validation(creInvoice),createInvoice)
router.get('/getinvoice',authentication,getInvoice)
router.post('/update/:id',authentication,validation(creInvoice),updateInvoice)
router.get('/delete/:id',authentication,deleteInvoice)
router.get('/updates/:id',authentication,getInvoiceUpdate)
router.get('/admin',authenticationAdmin,userList)

export default router

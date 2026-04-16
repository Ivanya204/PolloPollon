import express from "express"
import loginCustomerController from "../controller/loginCustomerContoller.js"


const router = express.Router()
router.route("/").post(loginCustomerController.login)
export default router
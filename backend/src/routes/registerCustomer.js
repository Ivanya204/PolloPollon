import express from "express"
import registreCustomerController from "../controller/registreCustomerContoller.js"

const router = express.Router()

router.route("/").post(registreCustomerController.register)
router.route("/verifyCodeEmail").post(registreCustomerController.verifyCode)

export default router
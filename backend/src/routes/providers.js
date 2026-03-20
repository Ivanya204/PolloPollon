import express from "express"
import providersController from "../controller/providersController.js"

const router = express.Router()
router.route("/")
.get(providersController.getProviders)
.post(providersController.insertProviders)

router.route("/:id")
.put(providersController.updateProvider)
.delete(providersController.deleteProvider)

export default router
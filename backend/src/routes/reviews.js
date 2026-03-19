import express from "express"
import reviewsController from "../controller/reviewsController.js"

const router = express.Router()
router.route("/")
.get()
.post()

router.route("/:id")
.put()
.delete()

export default router
import express from "express"
import bannerController from "../controller/bannersController.js"
import upload  from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(bannerController.getAllbanner)
.post(upload.single("image"), bannerController.insertBanner)

router.route("/:id")
.delete(bannerController.deleteBanner)
.put(upload.single("image"), bannerController.updateBanners)

export default router
import bannerModel from "../models/banners.js"
import {v2 as cloudinary} from "cloudinary"

const bannerController ={}

bannerController.getAllbanner = async (req, res) =>{
    try {
        const banners = await bannerModel.find()
        return res.status(200).json(banners)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

bannerController.insertBanner = async (req, res) =>{
    try {
        const {title, subtitle} = req.body
        const newBanner = new bannerModel({
            title,
            subtitle,
            image: req.file.path,
            public_id: req.file.filename
        })

        await newBanner.save()
        return res.status(200).json({message: "Banner saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

bannerController.deleteBanner = async (req, res) =>{
    try {
        const bannerFound = await bannerModel.findById(req.params.id)

        await cloudinary.uploader.destroy(bannerFound.public_id)

        await  bannerModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Banner deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

bannerController.updateBanners = async (req, res)=>{
    try {
        //1- solicito los nuevos campos 
        const {title, subtitle} = req.body

        //2 Identifico a que usuario estoy actualizado
        const bannerFound = await bannerModel.findById(req.params.id)

        const updateData = {
            title,
            subtitle
        }
        //si viene una imagen 
        if(req.file){
            //Eliminar la imagen anterior
            await cloudinary.uploader.destroy(bannerFound.public_id)

            //Guardo la imagen nueva
            updateData.image = req.file.path
            updateData.public_id = req.file.filename
        }

        //guardo todo en la base de datos
        await bannerModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )

        return res.status(200).json({message: "Banner update"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default bannerController
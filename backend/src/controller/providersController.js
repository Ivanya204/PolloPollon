//CÓDIGOS DE ESTADO Y VALIDACIONES
const providersController ={};
import providersModel from "../models/providers.js"

providersController.getProviders = async (req, res) =>{
    try {
        const providers = await providersModel.find()
        return res.status(200).json(providers)
    } catch (error) {
        console.log("error"+ error)
        
        return res.status(500).json({message: "Internal server error"})
    }
    
}

providersController.insertProviders = async (req, res)=>{
    try {
        let {name, birthday, heigth, DUI, phone} = req.body;
        name = name?.trim();
        heigth = heigth?.trim();
        DUI = DUI?.trim()
        phone = phone?.trim()

        if(!name || !DUI || !phone){
            return res.status(400).json({message: "Field required"})
        }

        if(name.length < 3){
            return res.status(400).json({message: "Field required"})
        }
        if(DUI.length > 10 || DUI.length < 9){
            return res.status(400).json({message: "Field required"})
        }
        if(birthday > new Date() || birthday < new Date("1920-01-01")){
            return res.status(400).json({message: "Field required"})
        }
        if(Number(heigth)>251){
            return res.status(400).json({message: "Field required"}) 
        }
        const newProvider = new providersModel({name, birthday, heigth, DUI, phone})
        await newProvider.save()

        return res.status(201).json({message: "Provider saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

providersController.deleteProvider = async (req, res)=>{
    try {
        const deletedProvider = await providersModel.findByIdAndDelete(req.params.id)
        if(!deletedProvider){
            return res.status(400).json({message: "Provider not found"}) 
        }
        return res.status(200).json({message: "Provider delete"}) 
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"}) 
    }
}

providersController.updateProvider = async (req, res) =>{
    try {
        let {name, birthday, heigth, DUI, phone} = req.body;
        name = name?.trim();
        heigth = heigth?.trim();
        DUI = DUI?.trim()
        phone = phone?.trim()

        if(name.length < 3){
            return res.status(400).json({message: "Field required"})
        }
        if(DUI.length > 10 || DUI.length < 9){
            return res.status(400).json({message: "Field required"})
        }
        if(birthday > new Date() || birthday < new Date("1920-01-01")){
            return res.status(400).json({message: "Field required"})
        }
        if(Number(heigth)>251){
            return res.status(400).json({message: "Field required"}) 
        }

        const providerUpdate = await providersModel.findByIdAndUpdate(
            req.params.id,
            {name, birthday, heigth, DUI, phone}, {new: true}
        )
        if(!providerUpdate){
            return res.status(400).json({message: "Provider not found"}) 
        }
        return res.status(200).json({message: "Provider update"}) 
    } catch (error) {
        console.log("error found "+ error)
        return res.status(500).json({message: "Internal server error"}) 
    }
}
export default providersController
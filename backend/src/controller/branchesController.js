//Se crea un array de metodos
const branchesController = {};
//import el Schema de la coleccion que se va a usar
import branchesModel from "../models/branches.js"

//SELECT
branchesController.getBranches = async (req, res) =>{
    const branches = await branchesModel.find()
    res.json(branches)
}

//Insert
branchesController.insertBranches = async(req, res)=>{
    const {name, adress, schedule, isActive}= req.body
    const newBranches = new branchesModel({name, adress, schedule, isActive})
    await newBranches.save()
    res.json({message: "Branch save"})
}

//update
branchesController.updateBranch = async(req, res)=>{
    const {name, adress, schedule, isActive} = req.body;
    await branchesModel.findByIdAndUpdate(req.params.id, {
        name, adress, schedule, isActive
    }, {new: true})
    res.json({message: "Branch uptated"})
}
branchesController.deleteBranch = async (req, res) =>{
    await branchesModel.findByIdAndDelete (req.params.id)
    res.json({message: "Branch delete"})
}

export default branchesController; 
//Creo un array de funciones
const employeesContoller = {}

import employeesModel from "../models/employees.js"

//select
employeesContoller.getEmployees = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
}

//insert
employeesContoller.insertEmployees = async(req, res) =>{
    const{name, lastName, salary, DUI, phone, email, password, idBranch} = req.body
    const newEmployee = new employeesModel ({name, lastName, salary, DUI, phone, email, password, idBranch})
    await newEmployee.save()
    res.json({message: "Employee saved"})
}

//update
employeesContoller.updateEmployee = async (req, res) => {
    //solicito los datos
    const{name, lastName, salary, DUI, phone, email, password, idBranch} = req.body
    await employeesModel.findByIdAndUpdate(
        req.params.id, {
            name, lastName, salary, DUI, phone, email, password, idBranch
        }, {new: true}
        
    );
    res.json({message: "Employee updated"})
}

//Eliminar
employeesContoller.deleteEmployee = async (req, res) =>{
    await employeesModel.findByIdAndDelete(req.params.id)
    res.json({message: "Employee deleted"});
}

export default employeesContoller
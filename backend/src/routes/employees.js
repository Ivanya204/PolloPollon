import express from "express";
import employeesController from "../controller/employeesController.js";

//Usamos de express su liberia router()

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees)

router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee)

export default router
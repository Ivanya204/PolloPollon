import express from "express";
import branchesController from "../controller/branchesController.js";
 //Router() nops ayuda a colocar los metodos que tendra mi endpoint
 const router = express.Router();
 router.route("/")
 .get(branchesController.getBranches)
 .post(branchesController.insertBranches)

 router.route("/:id")
 .put(branchesController.updateBranch)
 .delete(branchesController.deleteBranch)

 export default router; 
import express from "express";
import productsController from "../controller/productsController.js";
 //Router() nops ayuda a colocar los metodos que tendra mi endpoint
 const router = express.Router();
 router.route("/")
 .get(productsController.getProducts)
 .post(productsController.insertProducts)

 router.route("/:id")
 .put(productsController.updateProducts)
 .delete(productsController.deleteProduct)

 export default router;
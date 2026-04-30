import express from "express";
import productsController from "../controller/productsController.js";
 //Router() nops ayuda a colocar los metodos que tendra mi endpoint
 const router = express.Router();
 router.route("/")
 .get(productsController.getProducts)
 .post(productsController.insertProducts)


 router.route("/searchByName").post(productsController.searchByName)
 router.route("/getLowStock").get(productsController.getLowStock)
 router.route("/getProductsByPriceRange").post(productsController.getProductsByPriceRange)
 router.route("/countProducts").get(productsController.countProducts)

 router.route("/:id")
 .get(productsController.getProductsById)
 .put(productsController.updateProducts)
 .delete(productsController.deleteProduct)

 export default router;
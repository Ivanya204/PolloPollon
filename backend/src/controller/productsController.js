//Se crea un array de metodos
const productsController = {};
//import el Schema de la coleccion que se va a usar
import productModel from "../models/products.js"

//SELECT
productsController.getProducts = async (req, res) =>{
    const products = await productModel.find()
    res.json(products)
}

//Insert
productsController.insertProducts = async(req, res)=>{
    const {name, description, price, stock}= req.body
    const newProduct = new productModel({name, description, price, stock})
    await newProduct.save()
    res.json({message: "Prodcut save"})
}

//update
productsController.updateProducts = async(req, res)=>{
    const {name, description, price, stock} = req.body;
    await productModel.findByIdAndUpdate(req.params.id, {
        name, description, price, stock
    }, {new: true})
    res.json({message: "product uptated"})
}
productsController.deleteProduct = async (req, res) =>{
    await productModel.findByIdAndDelete (req.params.id)
    res.json({message: "Product delete"})
}

export default productsController; 
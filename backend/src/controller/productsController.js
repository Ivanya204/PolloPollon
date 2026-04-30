//Se crea un array de metodos
const productsController = {};
import products from "../models/products.js";
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
//Select solo uno por id 
productsController.getProductsById = async (req, res)=>{
    try {
        const product = await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).json({message: "El producto no puede ser encontrado"})
        }
        return res.status(200).json(product)
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}
//buscar por nombre
productsController.searchByName = async (req, res) =>{
    try {
        const {name} = req.body;
        const products = await productModel.find({name: 
            {$regex: name, $options: "i"}
        })
        if(!products){
            return res.status(404).json({message: "El producto no puede ser encontrado"})
        }
        return res.status(200).json(products)
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//procutos con stock bajo
productsController.getLowStock = async (req, res) =>{
    try {
        const product = await productModel.find ({stock: {$lt: 5}})
        return res.status(200).json(product)
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}
//flitros que el usuario coloque
productsController.getProductsByPriceRange = async(req, res)=>{
    try {
        const {min, max}= req.body
        const products = await productModel.find({
            price:{$gte: min, $lte: max}
        })
        if(!products){
            return res.status(404).json({message: "El producto no puede ser encontrado"})
        }
        return res.status(200).json(products)

    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}
//contar cuantos elementos hay en una coleccion
productsController.countProducts = async (req, res)=>{
    try {
        const count = await productModel.countDocuments()
        return res.status(200).json(count)
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export default productsController; 
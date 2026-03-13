import { Schema, model } from "mongoose";
//Le ponemos schema pq es un esquema que nosotroa exportamos
const productsSchema = new Schema({
    name: {
        type: String
    },
    description:{
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    }
},{
    timestamps: true,
    strict: false
}
)
export default model("Products", productsSchema)
import { Schema, model } from "mongoose";
//Le ponemos schema pq es un esquema que nosotroa exportamos
const providersSchema = new Schema({
    name: {
        type: String
    },
    birthday:{
        type: String
    },
    heigth: {
        type: Number
    },
    DUI: {
        type: String
    },
    phone: {
        type: String
    }
},{
    timestamps: true,
    strict: false
}
)
export default model("Providers", providersSchema)
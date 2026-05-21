import {Schema, model} from "mongoose";

const bannersShema = Schema({
    title:{
        type: String
    },
    subtitle:{
        type: String
    },
    image:{
        type: String
    },
    public_id:{
        type: String
    }
},
{
    timestamps: true,
    strict: false
})

export default model ( "Banners", bannersShema)
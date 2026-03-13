import { Schema, model } from "mongoose";
//Le ponemos schema pq es un esquema que nosotros exportamos
const branchesSchema = new Schema({
    name: {
        type: String
    },
    adress:{
        type: String
    },
    shedule: {
        type: String
    },
    isActive: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
}
)
export default model("Branches", branchesSchema)
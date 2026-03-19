import { Schema, model , mongoose} from "mongoose";

const reviewsSchema = new Schema({
    rating: {
        type: Number
    },
    comment:{
        type: String
    },
    idEmployee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    },
    idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
},{
    timestamps: true,
    strict: false
}
)
export default model("Reviews", reviewsSchema)
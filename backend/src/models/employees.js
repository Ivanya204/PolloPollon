import { Schema, model , mongoose} from "mongoose";

const employeesSchema = new Schema({
    name: {
        type: String
    },
    lastName:{
        type: String
    },
    salary: {
        type: Number
    },
    DUI: {
        type: String
    },
    phone: {
        type: Number
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    idBranch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches"
    },
    isVerified:{
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
}
)
export default model("Employees", employeesSchema)
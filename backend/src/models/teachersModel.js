import mongoose, {Schema, model} from "mongoose"; 

const teachersSchema = new Schema ({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    hireDate: {type: Date},
    isActive: {type: Boolean},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Boolean}
},
{
    timestamps: true,
    strict: false,
});

export default model("teachers", teachersSchema);
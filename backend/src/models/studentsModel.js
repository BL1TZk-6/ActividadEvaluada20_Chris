import mongoose, {Schema, model} from "mongoose"; 

const studentsSchema = new Schema ({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    birthdate: {type: Date},
    speciality_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "specialities",
    },
    carnet: {type: Number},
    phone: {type: String},
    isVerified: {type: Boolean},
    loginAttempts: {type: Number},
    timeOut: {type: Date},
},
{
    timestamps: true,
    strict: false,
});

export default model("students", studentsSchema);
import mongoose, {Schema, model} from "mongoose"; 

const tuitionsSchema = new Schema ({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
    },
    amount: {type: Number},
    paymentDate: {type: Date},
    method: {type: String},
    status: {type: Boolean},
    referenceNumber: {type: Number}
},
{
    timestamps: true,
    strict: false,
});

export default model("tuitions", tuitionsSchema);
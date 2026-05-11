import mongoose, {Schema, model} from "mongoose"; 

const specialitiesSchema = new Schema ({
    specialityName: {type: String},
    isAvailable: {type: Boolean},
},
{
    timestamps: true,
    strict: false,
});

export default model("specialities", specialitiesSchema);
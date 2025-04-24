import mongoose from "mongoose";

let LocationSchema = new mongoose.Schema({
    cityPoster:{type:String},
    cityName:{
        type:String, 
        unique:true
    },
    streetName:{type:String, default : ""},
    totalProperties:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"PropertiesModel",
        default:[]
    }]
    
});

export default mongoose.model("LocationModel",LocationSchema)
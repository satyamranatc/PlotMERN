import mongoose from "mongoose";

let PropertiesSchema = new mongoose.Schema({
    propertyPoster:{type:String, default:"https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399.jpg?v=1500393334"},
    propertyName:{type:String, default:""},
        propertyType: {
            type: String,
            enum: ["Plot", "Flat", "Independent Home"],
            default: "Flat"
        },
        propertyPrice:{
            type:Number
        } ,
        Location:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"LocationModel"
        }
    

});

export default mongoose.model("PropertiesModel",PropertiesSchema)
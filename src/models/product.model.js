import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
    },
    vendor:{
        type:String,
        lowercase:true,
        required:true,
    },
    selling_price:{
        type:Number,
        required:true,
    },
    buying_price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Product=mongoose.model("Product",productSchema)
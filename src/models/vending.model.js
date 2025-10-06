import mongoose from "mongoose";
const vendingSchema=new mongoose.Schema({
    location:{
        type:String,
        required:true,
        lowercase:true,
    },
    installed_at:{
        type:Date,
        required:true
    },
    apiUrl:{
        type:String,
        required:true,
        lowercase:true
    }
},{timestamps:true})
export const Vending=mongoose.model("Vending",vendingSchema)
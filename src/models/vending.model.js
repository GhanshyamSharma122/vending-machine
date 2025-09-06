import mongoose from "mongoose";
const vendingSchema=new mongoose.model({
    location:{
        type:String,
        required:true,
        lowercase:true,
    },
    installed_at:{
        type:Date,
        required:true
    }
})

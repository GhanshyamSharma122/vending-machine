import mongoose from "mongoose";

const vendingProductSchema=new mongoose.Schema({
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        }
    ],
    quantity:{
                type:Number,
                requried:true
    },
    vending_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vending",
    }

})
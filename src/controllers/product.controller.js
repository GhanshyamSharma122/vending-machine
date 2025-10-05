import { Product } from "../models/product.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const addProduct=asyncHandler(async (req,res)=>{
    const {name,vendor,selling_price,buying_price,category}=req.body
    if(
        [name,vendor,selling_price,buying_price,category].some((field)=>field.trim()==="")
    ){
        throw new ApiError(400,
            "should provide all the fields to add the product"
        )
    }
    const product=await Product.create(
        {name,vendor,selling_price,buying_price,category}
    )
    if(!product){
        throw new ApiError(
            500,
            "some error occured while adding the product"
        )
    }
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            product,
            "product added successfully"
        )
    )
})
const getProduct=asyncHandler(async (req,res)=>{

})
const addProductToVending=asyncHandler(async (req,res)=>{

})
const getProductFromVending=asyncHandler(async (req,res)=>{

})
export {
    addProduct,
    getProduct,
    addProductToVending,
    getProductFromVending
}
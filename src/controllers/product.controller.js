import { Product } from "../models/product.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const addProduct=asyncHandler(async (req,res)=>{
    const {name,vendor,selling_price,buying_price,category}=req.body
    if(
        [name,vendor,selling_price,buying_price,category].some((field)=>field.trim()==="")
    ){
        throw new ApiError(400,
            "should provide all the fields to add the product"
        )
    }
    const frontLocalPath=req.files?.product_front[0]?.path 
    console.log(frontLocalPath)
    if(!frontLocalPath){
        throw new ApiError(
            400,
            "product image is required"
        )
    }
    const product_front=await uploadOnCloudinary(frontLocalPath)
    if(!product_front){
        throw new ApiError(400,
            "some error occurred during handling image"
        )
    }
    const product=await Product.create(
        {name,vendor,selling_price,buying_price,category,product_front:product_front?.url || ""}
    )
    if(!product){
        throw new ApiError(
            500,
            "some error occured while adding the product"
        )
    }
    return res.
    status(201)
    .json(
        new ApiResponse(
            201,
            product,
            "product added sucessfully"
        )
    )
})
const getProduct=asyncHandler(async (req,res)=>{
    const allProducts=await Product.find()
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allProducts,
            "all product fetched sucessfully"
        )
    )
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
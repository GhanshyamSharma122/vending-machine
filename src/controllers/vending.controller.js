import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Vending} from "../models/vending.model.js"
const installVending=asyncHandler(async (req,res)=>{
    const [location,installed_at,apiUrl]=req.body
    if([location,installed_at,apiUrl].some((field)=>field==="")){
        throw new ApiError(
            400,
            "enter the location and installation date"
        )
    }
    const vending=await Vending.create({
        location,
        installed_at,
        apiUrl
    })
    if(!vending){
        throw new ApiError(
            500,
            "some error occurred in server"
        )
    }
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            vending,
            "vending machine installed successfully"
        )
    )
})
const getAllVending=asyncHandler(async (req,res)=>{
    const allVending=await Vending.find()
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allVending,
            "all vending machine fetched"
        )
    )
})
export {
    installVending,
    getAllVending
}
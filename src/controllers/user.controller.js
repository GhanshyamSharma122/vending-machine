import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,phone_no,role,password}=req.body
    if(
        [name,email,phone_no,role,password].some((field)=>field?.trim==="")

    ){
        throw new ApiError(400,"all field are required")
    }
    const existedUser=await User.findOne({
        $or:[{phone_no},{email}]
    })
    if (existedUser){
        throw new ApiError(409,"user with the same phone_no or email  exists")
    }
    const user=await User.create({
        name,email,phone_no,role,password,
    })
    const createdUser=await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(
            500,
            "something went wrong while registration please try again"
        )
    }
    return res.status(201).json(
        new ApiResponse(
            200,
            createdUser,
            "user registered successfully"
        )
    )
})
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if (!email){
        throw new ApiError(400,"give the valid email")
    }
    if(!password){
        throw new ApiError(400,"the password field cannot be empty")
    }
    const user=await User.findOne({email,})
    if(!user){
        throw new ApiError(404,"user doesnot exist")
    }
    const isPasswordCorrect=await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401,"invalid user credenrtials")
    }
    const accessToken=await user.generateAccessToken()
    delete user['password']
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user,
                accessToken
            },
            "user logged in successfully"
        )
    )

})
const logoutUser=asyncHandler(async (req,res)=>{
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "user logged out successfully"
        )
    )
})
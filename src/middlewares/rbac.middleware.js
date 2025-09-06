import {ApiError} from"../utils/ApiError.js"
export const verifyRole=role=>{
    return (req,res,next)=>{
        if(req.user.role===role){
            next()
        }else{
            throw new ApiError(401,`${role} cannot access this api`)
        }
    }
}
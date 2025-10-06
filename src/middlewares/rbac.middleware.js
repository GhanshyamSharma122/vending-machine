import {ApiError} from"../utils/ApiError.js"
export const verifyRole=roles=>{
    return (req,res,next)=>{
        if(roles.includes(req.user.role)){
            next()
        }else{
            throw new ApiError(401,`${req.user.role} cannot access this api`)
        }
    }
}

import { Router } from "express";
import {verifyRole} from "../middlewares/rbac.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {
    addProduct,getProduct,getProductFromVending,addProductToVending
} from "../controllers/product.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const router=Router()
router.route("/").post(verifyJWT,verifyRole(["admin"]),upload.fields([
    {
        name:'product_front',
        maxCount:1
    },
]),addProduct)
router.route("/").get(verifyJWT,verifyRole(["admin"]),getProduct)
router.route("/:location").post(verifyJWT,verifyRole(["employee"]),addProductToVending)
router.route("/:location").get(verifyJWT,getProductFromVending)
export default router
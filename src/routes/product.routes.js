import { Router } from "express";
import {verifyRole} from "../middlewares/rbac.middleware.js"
import {
    addProduct,getProduct,getProductFromVending,addProductToVending
} from "../controllers/product.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
const router=Router()
router.route("/").post(verifyRole(["admin"]),upload.fields([
    {
        name:'product_front',
        maxCount:1
    },
    {
        name:"product_back",
        maxCount:1
    }
]),addProduct)
router.route("/").get(verifyRole(["admin"]),getProduct)
router.route("/:location").post(verifyRole(["employee"]),addProductToVending)
router.route("/:location").get(getProductFromVending)
export default router
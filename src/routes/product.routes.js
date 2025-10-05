import { Router } from "express";
import {verifyRole} from "../middlewares/rbac.middleware.js"
import {
    addProduct,getProduct,getProductFromVending,addProductToVending
} from "../controllers/product.controller.js"
const router=Router()
router.route("/").post(verifyRole(["admin"],addProduct))
router.route("/").get(verifyRole(["admin"]),getProduct)
router.route("/:location").post(verifyRole(["employee"]),addProductToVending)
router.route("/:location").get(getProductFromVending)
export default router
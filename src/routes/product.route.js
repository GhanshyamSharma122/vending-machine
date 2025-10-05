import { Router } from "express";
import { verify } from "jsonwebtoken";
const router=Router()
router.route("/register").post(
    registerUser
)
router.route("/").post(addProduct)
router.route("/").get(getProduct)
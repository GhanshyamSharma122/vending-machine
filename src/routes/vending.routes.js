import { Router } from "express";
import {verifyRole} from "../middlewares/rbac.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router= Router()
router.route("/").post(verifyJWT,verifyRole(["admin"]),installVending)
router.route("/").get(verifyJWT,getAllVending)
export default router
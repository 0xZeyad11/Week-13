import { Router } from "express";
import { getMe, login, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/me').get(protectRoute , getMe)


export default router; 












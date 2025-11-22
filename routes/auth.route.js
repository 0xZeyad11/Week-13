import { Router } from "express";
import { getMe, login, signup } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/signup').post(signup) 
router.route('/login').post(login)
router.route('/me').get(protect , getMe)
export default router; 
import { Router } from "express";
import { singup } from "../controllers/auth.controller.js";
const router = Router();

router.route('/signup').post(singup) 

export default router; 
import { Router } from "express";
import uploadProfilePic from "../config/uploadProfilePic.js";
import ownerRegister from "../controllers/ownerRegister.controller.js";

const router = Router();

router.post("/owner", uploadProfilePic.single("profilePic"), ownerRegister);

export default router;

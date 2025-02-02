import { Router } from "express";
import businessRegister from "../controllers/businessRegister.controller.js";
import uploadRestaurantImages from "../config/uploadRestaurantImages.js";

const router = Router();

router.post(
  "/business",
  uploadRestaurantImages.single("restaurantImage"),
  businessRegister
);

export default router;

import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Ruta de objetos
const router = express.Router();

//Rutas
//Registro || METHOD POST
router.post("/registro", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Testeo de rutas
router.get("/test", requireSignIn, isAdmin, testController);

export default router;

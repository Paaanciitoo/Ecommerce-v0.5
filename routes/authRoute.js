import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Ruta de objetos
const router = express.Router();

//Rutas
//Registro || METHOD POST
router.post("/registro", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Contraseña olvidada || POST
router.post("/forgot-password", forgotPasswordController);

//Testeo de rutas
router.get("/test", requireSignIn, isAdmin, testController);

//Ruta protegida de usuario autenticado
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Ruta protegida de administrador autenticado
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;

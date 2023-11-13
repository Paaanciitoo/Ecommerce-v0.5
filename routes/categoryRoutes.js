import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//Rutas
//crear categoria
router.post(
  "/crear-categoria",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//actualizar categoria
router.put(
  "/actualizar-categoria/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Obtener todas las categorias
router.get("/obtener-categorias", categoryController);

//Obtener una categoria
router.get("/obtener-una-categoria/:slug", singleCategoryController);

//eliminar categoria
router.delete(
  "/eliminar-categoria/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;

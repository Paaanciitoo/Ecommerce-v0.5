import express from "express";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//Rutas
router.post(
  "/crear-producto",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//Rutas
router.put(
  "/actualizar-producto/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Obtener producto
router.get("/obtener-producto", getProductController);

//Obtener un producto
router.get("/obtener-producto/:slug", getSingleProductController);

//Obtener foto
router.get("/obtener-foto/:pid", productPhotoController);

//Eliminar producto
router.delete("/eliminar-producto/:pid", deleteProductController);

//Filtro de productos por categoría y precio
router.post("/filtrar-productos", productFilterController);

//Cuneta de productos
router.get("/cuenta-productos", productCountController);

//Producto por página
router.get("/lista-producto/:page", productListController);

//Buscar producto
router.get("/buscar-producto/:keyword", searchProductController);

//Productos similares
router.get("/productos-similares/:pid/:cid", relatedProductController);

//Pago con Paypal
//Token
router.get("/braintree/token", braintreeTokenController);

//Pagos
router.post("/braintree/pago", requireSignIn, braintreePaymentController)

export default router;

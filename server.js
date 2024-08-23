import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cateoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar env
dotenv.config();

// Conectar a la base de datos
connectDB().catch(error => {
  console.error('Error conectando a MongoDB:', error);
  process.exit(1); // Cierra la aplicación si no puede conectarse
});

// Estas dos líneas reemplazan a __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", cateoryRoutes);
app.use("/api/v1/product", productRoutes);

// Servir archivos estáticos de React desde client/build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Cualquier otra ruta debe devolver el index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Puerto
const PORT = process.env.PORT || 8080;

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(
    `El servidor está en ${process.env.DEV_MODE} en el puerto ${PORT}`.bgCyan.white
  );
});

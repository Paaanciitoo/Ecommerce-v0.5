import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //Validaciones
    if (!name) {
      return res.send({ error: "Es obligatorio colocar tu nombre" });
    }
    if (!email) {
      return res.send({ error: "Es obligatorio colocar tu correo" });
    }
    if (!password) {
      return res.send({ error: "Es obligatorio colocar una contraseña" });
    }
    if (!phone) {
      return res.send({ error: "Es obligatorio poner tu número de teléfono" });
    }
    if (!address) {
      return res.send({ error: "Es obligatorio colocar tu dirección" });
    }

    //Verificar usuario
    const existingUser = await userModel.findOne({ email });
    //Usuario existente
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Este usuario ya está registrado, por favor inicia sesión",
      });
    }
    //Registro de usuario
    const hashedPassword = await hashPassword(password);
    //Guardar
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "¡El usuario ha sido registrado existosamente!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al intentar registrarse",
      error,
    });
  }
};

//LOGIN POST
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validación
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "El correo o la contraseña son inválidos",
      });
    }
    //Verificar usuario
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "El correo no está registrado",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Contraseña incorrecta",
      });
    }
    //Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "El inicio de sesión ha sido exitoso",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al intentar iniciar sesión",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("Esta ruta está protegida");
};

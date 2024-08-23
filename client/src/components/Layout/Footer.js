import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer" style={{padding:"23.5px"}}>
      <h1 className="text-center">
        Todos los derechos reservados &copy; Mascotas team
      </h1>
      <p className="text-center mt-3">
        <Link to="/acerca_de">Acerca de</Link>|
        <Link to="/contacto">Contacto</Link>
      </p>
    </div>
  );
};

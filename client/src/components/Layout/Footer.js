import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">
        Todos los derechos reservados &copy; PancitoTeam
      </h1>
      <p className="text-center mt-3">
        <Link to="/acerca_de">Acerca de</Link>|
        <Link to="/contacto">Contacto</Link>|
        <Link to="/politicas">Politicas de privacidad</Link>
      </p>
    </div>
  );
};

import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🐾 Tienda para mascotas
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categoria" className="nav-link">
                  Categoría
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/registro" className="nav-link" href="#">
                  Registrarse
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" href="#">
                  Iniciar sesión
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/carrito" className="nav-link" href="#">
                  Carrito de compras (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

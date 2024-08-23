import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [, setCart] = useCart();
  const [cart] = useCart();
  const isLinkDisabled = true;
  const handleClick = (e) => {
    if (isLinkDisabled) {
      e.preventDefault(); // Previene la navegación si el enlace está deshabilitado
    }
  };
  const handleLogout = () => {
    setCart([])
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.setItem("cart", JSON.stringify([]));
    toast.success("Sesión cerrada correctamente");
  };
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
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>

              {!auth.user ? (
                <>
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
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                      <NavLink
                        to={`/panel/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className={`dropdown-item ${isLinkDisabled ? 'disabled-link' : ''}`}
                        onClick={handleClick}
                        >
                          Opción en desarrollo
                      </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Cerrar sesión
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li
                className="nav-item"
                style={{
                  marginTop: "5px",
                  marginRight: "30px",
                  fontFamily: "sans-serif",
                }}
              >
                <Badge count={cart?.length} showZero>
                  <NavLink to="/carrito" className="nav-link" href="#">
                    Carrito de compras
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

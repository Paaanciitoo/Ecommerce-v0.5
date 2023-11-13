import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Panel del administrador</h4>
          <NavLink
            to="/panel/admin/crear-categoria"
            className="list-group-item list-group-item-action"
          >
            Crear categoría
          </NavLink>
          <NavLink
            to="/panel/admin/crear-producto"
            className="list-group-item list-group-item-action"
          >
            Crear producto
          </NavLink>
          <NavLink
            to="/panel/admin/usuarios"
            className="list-group-item list-group-item-action"
          >
            Usuarios
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;

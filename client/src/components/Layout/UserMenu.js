import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>Panel del usuario</h4>
          <NavLink
            to="/panel/user/perfil"
            className="list-group-item list-group-item-action"
          >
            Perfil
          </NavLink>
          <NavLink
            to="/panel/user/pedidos"
            className="list-group-item list-group-item-action"
          >
            Pedidos
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

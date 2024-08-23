import React, {useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const AdminOrders = () => {
    const [status, setStatus] = useState(["Pendiente", "Enviado", "Entregado", "Cancelado", "Reembolsado"]);
    const [changeStatus, setChangeStatus] = useState("");
  return (
    <Layout ttile={"Todos los pedidos"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Admin Orders</h1>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;

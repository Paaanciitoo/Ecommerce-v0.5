import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/pedidos", {
        headers: {
          Authorization: `Bearer ${auth?.token}`, // Asegúrate de incluir el token de autenticación
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();

    // Escucha el evento 'paymentMade'
    const handlePaymentMade = () => {
      getOrders();
    };

    window.addEventListener("paymentMade", handlePaymentMade);

    // Limpia el evento cuando el componente se desmonta
    return () => {
      window.removeEventListener("paymentMade", handlePaymentMade);
    };
  }, [auth?.token]);

  return (
    <Layout title={"Tus pedidos"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Pedidos</h1>
            {console.log(orders)}
            <p>{JSON.stringify(orders, null, 4)}</p>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Comprador</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Realizado" : "Fallido"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

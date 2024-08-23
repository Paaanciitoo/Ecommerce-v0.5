import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Precio total a pagar
  const getTotal = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + Number(item.price);
      });
      return total.toLocaleString("es-ES", {
        style: "currency",
        currency: "CLP",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar producto del carrito
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener token de cliente
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //Realizar pago
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/pago", {
        cart,
        nonce,
      });
      // Después de que se realiza el pago
      if (data) {
        // Emite un evento global
        window.dispatchEvent(new Event("paymentMade"));
      }
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/panel/user", { state: data });
      toast.success("Pago realizado correctamente");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {`Sea bienvenido a su carrito de compra, ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `Tienes ${cart?.length} producto(s) en el carrito ${
                    auth?.token
                      ? ""
                      : "Por favor, inicia sesión para continuar con la compra de los productos"
                  }`
                : "Tu carrito está vacío"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p, index) => (
              <div
                key={`${p._id}-${index}`}
                className="row mb-3 card flex-grow"
              >
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/obtener-foto/${p._id}`}
                      className="card-img-top mb-3"
                      alt={p.name}
                      width="100px"
                      height="270px"
                    />
                  </div>
                  <div className="col-md-8 mt-4">
                    <h3 style={{ fontWeight: "bold" }}>{p.name}</h3>
                    <p>{p.description.substring(0, 60)}</p>
                    <h5 style={{ color: "red", fontWeight: "bold" }}>
                      Precio: {Number(p.price).toLocaleString("es-CL") + " CLP"}
                    </h5>
                    <button
                      className="btn btn-danger mt-4"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Quitar producto
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h4>Resumen de compra</h4>
            <p>Verifique sus datos antes de pagar.</p>
            <hr />
            <h4>Total: {getTotal()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Dirección actual</h4>
                  <h5>{auth?.user?.address}</h5>
                  <p></p>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <p></p>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/carrito",
                      })
                    }
                  >
                    Por favor, inicia sesión para realizar compras.
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-outline-primary mb-3"
                    style={{
                      mariginBottom: "10px",
                      borderRadius: "2rem",
                    }}
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Procesando pago ..." : "Pagar"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

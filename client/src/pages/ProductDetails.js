import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  //Detalles del producto
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //Obtener todos los productos
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/obtener-producto/${params.slug}`
      );
      setProduct(data?.product);
      getSimiliarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //Productos relacionados
  const getSimiliarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/productos-similares/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row container mt-2">
          <div className="col">
            <img
              src={`/api/v1/product/obtener-foto/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="650px"
              width="160px"
            />
          </div>
          <div className="col">
            <h1 className="text-center" style={{ fontWeight: "bold" }}>
              Detalles del producto
            </h1>
            <h3 style={{ color: "#F57271", fontWeight: "bold" }}>{product.name}</h3>
            <img src="/images/1.gif" alt="gif" />
            <h3 style={{fontWeight:"bold", color:"red"}}>
              Precio: {Number(product.price).toLocaleString("es-CL") + " CLP"}
            </h3>
            <h6>{product?.category?.name}</h6>
            <h6>Cantidad: <span style={{color:"#5499C7", fontWeight:"bold"}}>{product?.quantity}</span> </h6>
            <h6 style={{fontSize:"17px"}}><span style={{}}>Acerca de:</span> {product.description}</h6>
            <br />
            <button
              className="btn btn-outline-danger btn-lg"
              style={{ borderRadius: "2rem" }}
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Producto añadido al carrito");
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <h1>Productos similares</h1>
          {relatedProducts?.length < 1 && (
            <p className="text-center">
              No se han encontrado productos similares
            </p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" key={p._id} style={{ width: "20rem" }}>
                <img
                  src={`/api/v1/product/obtener-foto/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body" style={{ textAlign: "center" }}>
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-text" style={{ color: "#9c292fff" }}>
                    <h4>
                      <b>
                        {" "}
                        $ {Number(p.price).toLocaleString("es-CL") + " CLP"}
                      </b>
                    </h4>
                  </div>
                  <button
                    className="btn btn-success"
                    style={{ borderRadius: "2rem" }}
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Producto añadido al carrito");
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

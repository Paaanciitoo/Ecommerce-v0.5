import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch();
  return (
    <Layout title={"Resultados de búsqueda"}>
      <div className="container">
        <div className="text-center">
          <h1>Resultados de búsqueda</h1>
          <h6>
            {values?.results.length < 1
              ? "No se encontró ningún producto"
              : `Se encontró ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
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
                    className="btn btn-primary m-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ borderRadius: "2rem" }}
                  >
                    Más detalles
                  </button>
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

export default Search;

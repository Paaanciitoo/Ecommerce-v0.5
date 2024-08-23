import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Load all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/obtener-producto");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error al cargar los productos");
    }
  };

  //life cycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">Lista de productos</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/panel/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`/api/v1/product/obtener-foto/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body" style={{textAlign:"center"}}>
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

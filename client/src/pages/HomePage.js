import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/obtener-categorias");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //Obtener todos los productos
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/lista-producto/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Obtener cuenta total
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/cuenta-productos");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //Cargar más productos
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/lista-producto/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Filtrar productos por categoría
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //Filtrar productos por precio
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filtrar-productos", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Los mejores productos - Tienda para mascotas"}>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{
          width: "1500px",
          height: "400px",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
          margin: "auto",
          marginTop: "30px",
          marginBottom: "300px",
          borderRadius: "6rem",
        }}
      >
        <div className="carousel-indicators">
          <button
            disabled
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
          />
          <button disabled data-bs-slide-to={1} aria-label="Slide 2" />
          <button disabled data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/image1.jpg"
              className="d-block w-100"
              alt="..."
              style={{ borderRadius: "3rem" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>¡Bienvenido a tu paraíso de mascotas! 🌈</h5>
              <p>
                Descubre la mejor selección de productos y accesorios para
                consentir a tus peludos amigos. 🦜🐰
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/images/image2.jpg"
              className="d-block w-100"
              alt="..."
              style={{ height: "864px", borderRadius: "3rem" }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <h5>
                Encuentra todo lo necesario para hacerles sentir especiales.
                🐕❤️
              </h5>
              <p>
                En nuestra tienda, cada rincón está lleno de amor y cuidado para
                tus mascotas. 🐹🐾
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="/images/image3.jpg"
              className="d-block w-100"
              alt="..."
              style={{ borderRadius: "3rem" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>
                ¡Descubre un mundo de ternura en nuestra tienda de animales! 🐾
              </h5>
              <p>
                Encuentra todo lo que tu mascota necesita para ser feliz. 🐶🐱
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
          style={{ marginTop: "450px" }}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
          style={{ marginTop: "450px" }}
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid p-3">
        <div className="row mt-3">
          <div className="col-md-3">
            <h4 className="text-center" style={{ marginTop: "30px" }}>
              <b>Filtro por categorías</b>
            </h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/*Filtro por precio*/}
            <h4 className="text-center mt-4">
              <b>Filtro por precios</b>
            </h4>
            <div className="d-flex flex-column" style={{}}>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div
              className="d-flex flex-column mt-4"
              style={{
                width: "400px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{ borderRadius: "2rem" }}
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Reiniciar filtros
              </button>
              <br />
            </div>
            <div
              id="carouselExampleSlidesOnly"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div
                className="carousel-inner"
                style={{ width: "460px", height: "400px" }}
              >
                <div className="carousel-item active">
                  <img
                    src="/images/verano.jpg"
                    className="d-block w-100"
                    alt="..."
                    style={{ height: "267px", borderRadius: "3rem" }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/perro.jpg"
                    className="d-block w-100"
                    alt="..."
                    style={{ height: "267px", borderRadius: "3rem" }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/gato.jpg"
                    className="d-block w-100"
                    alt="..."
                    style={{ height: "267px", borderRadius: "3rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center" style={{fontWeight:"bold"}}>
              ¡Bienvenido a la sección de productos!
            </h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  key={p._id}
                  style={{ width: "20rem" }}
                >
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
            <div
              className="p-3"
              style={{
                justifyContent: "center",
                margin: "auto",
                alignItems: "center",
                width: "200px",
              }}
            >
              {products && products.length < total && (
                <button
                  style={{ borderRadius: "2rem" }}
                  className="btn btn-outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Cargando..." : "Cargar más ↓"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //Obtener solo un producto
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/obtener-producto/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener todas las categrías
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/obtener-categorias");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener las categorías");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  useEffect(() => {
    getAllCategory();
  }, []);

  //Crear producto en el formulario
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/actualizar-producto/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(`El producto se ha actualizado correctamente`);
        navigate("/panel/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto");
    }
  };

  //Eliminar producto
  const handleDelete = async (e) => {
    try {
      let answer = window.confirm("¿Estás seguro de eliminar el producto?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/eliminar-producto/${id}`
      );
      toast.success("Producto eliminado correctamente");
      navigate("/panel/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <Layout title={"Crear un producto - Panel de control"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Actualizar producto</h1>
            <div className="m-1 w-75" style={{ paddingLeft: "300px" }}>
              <Select
                bordered={false}
                placeholder="Selecciona una categoría"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-success col-md-12">
                  {photo ? photo.name : "Subir imagen"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Foto del producto"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/obtener-foto/${id}`}
                      alt="Foto del producto"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Escribe un nombre"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Escribe la descripción del producto"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Escribe el precio"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
                Precio formateado:{" "}
                {Number(price).toLocaleString("es-CL") + " CLP"}
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Escribe la cantidad"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="¿Tiene envío?"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value === "1" ? true : false);
                  }}
                  value={shipping ? "1" : "0"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Sí</Option>
                </Select>
              </div>
              <div
                className="mb-3"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Actualizar producto
                </button>
                <button className="btn btn-danger ms-4" onClick={handleDelete}>
                  Eliminar producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

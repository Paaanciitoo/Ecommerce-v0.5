import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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
    getAllCategory();
  }, []);

  //Crear producto en el formulario
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "/api/v1/product/crear-producto",
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success(`El producto ${name} ha sido creado correctamente`);
        navigate("/panel/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto");
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
            <h1>Crear producto</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                <p className="mt-3">
                  Precio formateado: {Number(price).toLocaleString("es-CL") + " CLP"}
                </p>
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
                    setShipping(value);
                  }}
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
                <button className="btn btn-primary" onClick={handleCreate}>
                  Crear producto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

import React from "react";
import Layout from "../../components/Layout/Layout";
import "../../styles/style.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout title={"Dashboard"}>
      <div className="ag-format-container" style={{backgroundImage:""}}>
        <div className="ag-courses_box">
          <div
            className="ag-courses_item"
            style={{
              justifyContent: "center",
              margin: "auto",
              alignContent: "center",
              position: "relative",
              marginTop: "200px",
            }}
          >
            <Link
              to="/"
              className="ag-courses-item_link"
              style={{ textDecoration: "none" }}
            >
              <div className="ag-courses-item_bg" />
              <div className="ag-courses-item_title">
                Tu pago fue realizado con éxito, se te enviará un mensaje a tu teléfono con los detalles de tu compra.
              </div>
              <div className="ag-courses-item_date-box">
                Presiona aqúi para
                <span className="ag-courses-item_date"> ir al inicio</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

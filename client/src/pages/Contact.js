import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contacto"}>
      <div className="row contactus">
        <div className="contactcss col-md-4 text-white">
          <h1
            className="p-2 text-center"
            style={{ borderRadius: "20px", fontSize: "60px" }}
          >
            ¡Contáctanos!
          </h1>{" "}
          <br />
          <p className="text-justify mt-2">
            Cualquier consulta que tenga sobre nuestros productos, no dude en
            llamar en cualquier momento, estamos disponibles las 24 horas de la
            semana.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.ayuda@tiendaparamascotas.cl
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 9 7364 9374
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (Totalmente gratis)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

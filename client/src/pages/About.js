import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Acerca de - Tienda para mascotas"}>
      <div className="row about">
        <div className="aboutcss col-md-4 text-white">
          <h1 className="p-2 text-center">
            ¡Todo lo que necesitas, lo tenemos!
          </h1>
          <br />
          <p className="text-justify mt-2">
            Nuestro principal objetivo es brindar todo lo que una mascota
            necesita y sueña para ser feliz. Desde las mejores marcas de
            alimentos para asegurar su bienestar y prolongar su vida, hasta los
            juguetes más resistentes para tener una vida llena de momentos
            divertidos.
          </p>
          <p className="text-justify mt-2">
            Detrás de TodoMascotas, hay un equipo totalmente especializado y
            amantes de las mascotas, donde cuidamos minuciosamente la elección y
            recomendación de los productos que ofrecemos.
          </p>
        </div>
      </div>
    </Layout>
  );
};

Layout.defaultProps = {
  title: "TodoMascotas - Tienda para mascotas",
  description: "Proyecto final",
  keywords: "mern, react, node, mongodb",
  author: "Mascotas team",
};

export default About;

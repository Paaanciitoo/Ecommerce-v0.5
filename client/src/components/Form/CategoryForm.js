import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa una nueva categoría"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Ingresar
        </button>
      </form>
    </>
  );
};

export default CategoryForm;

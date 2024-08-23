import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.get(
            `/api/v1/product/buscar-producto/${values.keyword}`
        );
        setValues({ ...values, results: data });
        navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{paddingRight:"400px", fontFamily:"sans-serif"}}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Búsqueda"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{"width":"300px"}}
        />
        <button className="btn btn-outline-success" type="submit" style={{borderRadius:"2rem"}}>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

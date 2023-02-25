import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Mem = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <button onClick={() => navigate(-1)}>go back</button>
      <h1>Mem {id}</h1>
    </div>
  );
};

export default Mem;

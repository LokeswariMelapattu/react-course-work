import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/actionCreators/productsActions";

function ProductCreator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, price, description }));
    navigate("/vip/products");
  };

  return (
    <div className="product-creator">
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="cancel-btn"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductCreator;

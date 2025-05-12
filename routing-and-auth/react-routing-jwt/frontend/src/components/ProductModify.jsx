import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  fetchProduct,
} from "../redux/actionCreators/productsActions";

function ProductModify() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");

  useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [dispatch, productId, product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: productId, name, price, description }));
    // navigate(`/products/${productId}`);
    if (location.state?.from === "list") {
      navigate("/vip/products");
    } else if (location.state?.from === "detail") {
      navigate(`/vip/products/${productId}`);
    } else {
      // If the origin is not known, navigate to a default route
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductModify;

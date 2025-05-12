// ProductDetail.jsx
import React, { useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, removeProduct } from "../redux/actionCreators/productsActions"; // This action needs to be created

function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );
  const userRole = useSelector((state) => state.auth.user?.role);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId, product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleModify = () => {
    navigate(`/vip/products/${productId}/modify`, { state: { from: 'detail' } });
  };
  const handleDelete = () => {
    dispatch(removeProduct(productId));
    navigate("/vip/products");
  };

  return (
    <div className="product-detail container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {userRole === "admin" && (
        <div className="product-admin-actions">
          <button
            onClick={handleModify}
            className="modify-btn"
          >
            Modify
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      )}
      {userRole !== "admin" && (
        <button>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductDetail;

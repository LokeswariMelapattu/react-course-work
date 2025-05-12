import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  fetchProductsIfNeeded,
  removeProduct,
} from "../redux/actionCreators/productsActions";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const userRole = useSelector((state) => state.auth.user?.role); // assuming role is in auth.user

  const handleModify = (productId) => {
    navigate(`/vip/products/${productId}/modify`, { state: { from: 'list' } });
  };
  const handleDelete = (productId) => {
    dispatch(removeProduct(productId));
    navigate("/vip/products");
  };

  useEffect(() => {
    dispatch(fetchProductsIfNeeded());
  }, []);

  return (
    <div className="products container">
      <h1>VIP Products</h1>
      {products.length === 0 ? (
        <div className="empty">
          No products available
        </div>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li
              key={product.id}
              className="product-item"
            >
              <span className="product-name">
                <strong>Product</strong>: {product.name}
              </span><br />
              <span className="product-price">
                <strong>Price</strong>:  ${product.price}
              </span><br />
              <NavLink
                to={`${product.id}`}
                className="product-details-link"
              >
                View Details
              </NavLink>
              {userRole === "admin" && (
                <>
                  <button
                    onClick={() => handleModify(product.id)}
                    className="product-modify-btn"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="product-delete-btn"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {userRole === "admin" && (
        <NavLink
          to="/vip/products/add"
          className="add-new-product-link"
        >
          Add New Product
        </NavLink>
      )}
    </div>
  );
};

export default Products;

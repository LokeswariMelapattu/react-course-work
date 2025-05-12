import axios from "axios";
import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actionTypes";
import { showNotification } from "./notificationActions";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;


export const fetchProductsIfNeeded = () => {
  return (dispatch, getState) => {
    const { products } = getState();
    console.log("products.products.length: " + products.products.length);
    if (products.products.length <= 1) {
      dispatch(fetchProducts());
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(showNotification("Fetching products...", "product", "loading"));
    try {
      const response = await axios.get("/api/products");
      dispatch(setProducts(response.data));
      dispatch(
        showNotification("Products fetched successfully", "product", "success")
      );
    } catch (error) {
      console.error("Failed to fetch products:", error);
      dispatch(
        showNotification("Failed to fetch products", "product", "error")
      );
    }
  };
};

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addProduct = (product) => {
  return (dispatch) => {
    // Assume the backend API to add a product is /api/products/add
    showNotification("loading", "product", "loading");
    axios
      .post("/api/products", product)
      .then((response) => {
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data,
        });
        dispatch(
          showNotification("Product added successfully", "product", "success")
        );
      })
      .catch((error) => {
        dispatch(showNotification("Failed to add product", "product", "error"));
      });
  };
};

export const removeProduct = (productId) => {
  return (dispatch) => {
    // Assume the backend API to remove a product is /api/products/remove/:id
    dispatch(showNotification("loading", "product", "loading"));
    axios
      .delete(`/api/products/${productId}`)
      .then(() => {
        dispatch({
          type: REMOVE_PRODUCT,
          payload: productId,
        });
        dispatch(
          showNotification("Product removed successfully", "product", "success")
        );
      })
      .catch((error) => {
        dispatch(
          showNotification("Failed to remove product", "product", "error")
        );
      });
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    dispatch(showNotification("Updating product...", "product", "loading"));
    const { id, ...updateData } = product; // Destructure the id and the rest of the product data
    console.log("Updating product:", JSON.stringify(updateData));
    try {
      const response = await axios.put(`/api/products/${id}`, updateData);
      dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data,
      });
      dispatch(
        showNotification("Product updated successfully", "product", "success")
      );
    } catch (error) {
      console.error("Failed to update product:", error);
      dispatch(
        showNotification("Failed to update product", "product", "error")
      );
    }
  };
};

export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(showNotification("Fetching product...", "product", "loading"));
    try {
      const response = await axios.get(`/api/products/${productId}`);
      dispatch({
        type: ADD_PRODUCT, // Assuming ADD_PRODUCT action will handle adding a single product to the state
        payload: response.data,
      });
      dispatch(
        showNotification("Product fetched successfully", "product", "success")
      );
    } catch (error) {
      console.error(`Failed to fetch product with id ${productId}:`, error);
      dispatch(showNotification("Failed to fetch product", "product", "error"));
    }
  };
};

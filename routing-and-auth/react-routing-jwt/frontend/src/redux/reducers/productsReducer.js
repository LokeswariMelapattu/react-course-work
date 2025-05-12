import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actionTypes";

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
      // Check if the product already exists in the state
      const exists = state.products.some((p) => p.id === action.payload.id);
      return exists
        ? {
            ...state,
            products: state.products.map((p) =>
              p.id === action.payload.id ? action.payload : p
            ),
          }
        : {
            ...state,
            products: state.products.concat(action.payload),
          };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    default:
      return state;
  }
};

export default productsReducer;

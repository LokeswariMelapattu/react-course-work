// Async action (Thunk) for fetching products
export const fetchProducts = () => {
    return async (dispatch, getState) => {
        dispatch(fetchProductsRequest());
        const token = getState().user?.token;
        try {
            const response = await axios.get("/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchProductsFailure(error.response?.data || "Failed to fetch products"));
        }
    };
};
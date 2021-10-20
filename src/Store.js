import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/admin-auth-slice/userSlice";
import categoryReducer from "./pages/category/categorySlice";
import productReducer from "./pages/product/productSlice";
import paymentReducer from "./pages/payments/paymentSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		category: categoryReducer,
		product: productReducer,
		payment: paymentReducer,
	},
});

export default store;

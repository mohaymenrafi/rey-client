import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import productsReducer from "../features/product/productSlice";

export const store = configureStore({
	reducer: {
		products: productsReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

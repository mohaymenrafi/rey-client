import { createSlice } from "@reduxjs/toolkit";
import { localProduct as productType } from "../../types/product";

import { localProduct } from "../../localData";
import { RootState } from "../../app/store";

interface IState {
	products: productType[];
	loading: string;
	error: string | null;
}

const initialState: IState = {
	products: localProduct,
	loading: "idle",
	error: null,
};

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
});

export const selectProduct = (state: RootState) => state.products;

export default productSlice.reducer;

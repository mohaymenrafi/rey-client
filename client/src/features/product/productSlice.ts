import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localProduct as productType } from "../../types/product";
import { RootState } from "../../app/store";
import { axiosPrivate } from "../../apis/apiConfig";

interface IState {
	products: productType[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}

const initialState: IState = {
	products: [],
	loading: "idle",
	error: undefined,
};

export const getAllProducts = createAsyncThunk("/products", async () => {
	const response = await axiosPrivate.get("/products");
	return response.data;
});

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		loadProducts: (state, action) => {
			state.loading = "succeeded";
			state.products = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.loading = "pending";
			})
			.addCase(
				getAllProducts.fulfilled,
				(state, action: PayloadAction<productType[]>) => {
					state.loading = "succeeded";
					state.products = action.payload;
				}
			);
	},
});

export const selectAllProducts = (state: RootState) => state.products;
export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;

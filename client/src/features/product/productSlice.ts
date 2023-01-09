import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localProduct as productType } from "../../types/product";
import { RootState } from "../../app/store";
import { axiosPrivate } from "../../apis/apiConfig";
import { IRejectError } from "../../types/error";

interface IError {
	message?: string;
	status?: number;
}

interface IState {
	products: productType[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | IError;
}

const initialState: IState = {
	products: [],
	loading: "idle",
	error: "",
};

export const getAllProducts = createAsyncThunk(
	"/products",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosPrivate.get("/products");
			return response.data as productType[];
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error);
		}
	}
);

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
			)
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = "failed";
				state.error = {
					message: action.error.message,
				};
			});
	},
});

export const selectAllProducts = (state: RootState) => state.products;
export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;

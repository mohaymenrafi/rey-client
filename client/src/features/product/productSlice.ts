import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductResponse } from "../../types/product";
import { RootState } from "../../app/store";
import { axiosPrivate } from "../../apis/apiConfig";

interface IError {
	message?: string;
	status?: number;
	data?: {
		message: string;
	};
}

interface IState {
	products: IProductResponse;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | IError;
}

const initialState: IState = {
	products: {
		products: [],
		totalPages: 0,
		currentPage: 1,
	},
	loading: "idle",
	error: "",
};

export const getAllProducts = createAsyncThunk<
	IProductResponse,
	{
		limit: number;
		page: number;
	},
	{
		rejectValue: IError;
	}
>("/products", async ({ limit, page }, { rejectWithValue }) => {
	try {
		const response = await axiosPrivate.get(
			`/products?limit=${limit}&page=${page}`
		);
		return response.data as IProductResponse;
	} catch (error: any) {
		if (!error.response) {
			throw error;
		}
		return rejectWithValue({
			data: error.response.data,
			status: error.reponse.status,
			message: error.reponse.statusText,
		} as IError);
	}
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
				state.error = "";
			})
			.addCase(
				getAllProducts.fulfilled,
				(state, action: PayloadAction<IProductResponse>) => {
					state.loading = "succeeded";
					state.products.products = action.payload.products;
					state.products.totalPages = action.payload.totalPages;
					state.products.currentPage = action.payload.currentPage;
				}
			)
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload) {
					state.error = action.payload;
					if (action.payload.status === 403) {
						state.products.products = [];
						state.products.totalPages = 0;
						state.products.currentPage = 1;
					}
				}
				state.error = {
					message: action.error.message,
				};
			});
	},
});

export const selectAllProducts = (state: RootState) => state.products;
export const { loadProducts } = productSlice.actions;
export default productSlice.reducer;

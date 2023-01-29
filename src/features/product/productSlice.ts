import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductResponse } from "../../types/product";
import { RootState } from "../../app/store";
import { axiosPublic } from "../../apis/apiConfig";
import { queryString } from "../../utils/queryStringBuilder";

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
		limit?: number;
		page?: number;
		categoryFilter?: string;
		color?: string;
		size?: string;
	},
	{
		rejectValue: IError;
	}
>(
	"/products",
	async (
		{ limit, page, categoryFilter, size = "", color = "" },
		{ rejectWithValue }
	) => {
		const filtersObj = {
			category: categoryFilter,
			color,
			size,
		};
		const url: string = queryString(filtersObj)
			? `&${queryString(filtersObj)}`
			: "";
		const fullUrl: string = `/products?limit=${limit}&page=${page}${url}`;

		try {
			const response = await axiosPublic.get(fullUrl);
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

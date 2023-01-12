import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductType as productType } from "../../types/product";
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
	products: productType[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | IError;
}

const initialState: IState = {
	products: [],
	loading: "idle",
	error: "",
};

export const getAllProducts = createAsyncThunk<
	productType[],
	void,
	{
		rejectValue: IError;
	}
>("/products", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosPrivate.get("/products");
		return response.data as productType[];
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
				(state, action: PayloadAction<productType[]>) => {
					state.loading = "succeeded";
					state.products = action.payload;
				}
			)
			.addCase(getAllProducts.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload) {
					state.error = action.payload;
					if (action.payload.status === 403) {
						state.products = [];
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

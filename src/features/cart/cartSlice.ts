import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct, IUpdateCartData } from "../../types/product";
import { filter, findIndex } from "lodash";
import { RootState } from "../../app/store";
import { axiosPrivate } from "../../apis/apiConfig";
import { cartCalculator } from "../../utils/cartCalculator";

interface IState {
	products: ICartProduct[];
	count: number;
	subTotal: number;
	total: number;
}

interface IUpdateCart {
	product: ICartProduct;
	operation: "INCREASE" | "DECREASE";
}

const initialState: IState = {
	products: [],
	count: 0,
	subTotal: 0,
	total: 0,
};

export const addProductToCart = createAsyncThunk(
	"/addProductToCart",
	async (data: ICartProduct, { rejectWithValue, getState }) => {
		const state = getState() as RootState;
		const userId = state?.user?.user?.id;
		try {
			const response = await axiosPrivate.post(`/cart/${userId}`, data);
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error.response);
		}
	}
);

export const getProductsFromCart = createAsyncThunk(
	"getProductsFromCart",
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const userId = state?.user?.user?.id;

		try {
			const response = await axiosPrivate.get(`/cart/${userId}`);
			return response.data.products;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error.response);
		}
	}
);

//for update, need to pass action inside data -> INCREMENT | DECREMENT | DELETEITEM
export const updateProductsFromCart = createAsyncThunk(
	"updateProductsFromCart",
	async (data: IUpdateCartData, { getState, rejectWithValue }) => {
		const userId = (getState() as RootState)?.user?.user?.id;
		try {
			const response = await axiosPrivate.put(`/cart/${userId}`, data);
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error.response);
		}
	}
);

export const clearProductsFromCart = createAsyncThunk(
	"clearProductsFrom",
	async (_, { getState, rejectWithValue }) => {
		const userId = (getState() as RootState)?.user?.user?.id;
		try {
			const response = await axiosPrivate.delete(`/cart/${userId}`);
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error.response);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartProduct>) => {
			const { productId, quantity, color, size } = action.payload;
			const hasIndex: number = findIndex(
				state.products,
				(item) =>
					item.productId === productId &&
					item.color === color &&
					item.size === size
			);

			if (hasIndex > -1) {
				const prevItem = state.products[hasIndex];
				prevItem.quantity += quantity;
			} else {
				state.products.push(action.payload);
			}
			const { count, subTotal, total } = cartCalculator(state.products);
			state.count = count;
			state.subTotal = subTotal;
			state.total = total;
		},
		removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
			const { productId, color, size } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item.productId === productId &&
					item.color === color &&
					item.size === size
				);
			});
			state.products = filter(state.products, (_, idx) => idx !== itemIndex);
			const { count, subTotal, total } = cartCalculator(state.products);
			state.count = count;
			state.subTotal = subTotal;

			state.total = total;
		},
		updateCart: (state, action: PayloadAction<IUpdateCart>) => {
			const { productId, color, size } = action.payload.product;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item.productId === productId &&
					item.color === color &&
					item.size === size
				);
			});
			if (action.payload.operation === "INCREASE") {
				state.products[itemIndex].quantity += 1;
			} else if (action.payload.operation === "DECREASE") {
				state.products[itemIndex].quantity -= 1;
			}
			const { count, subTotal, total } = cartCalculator(state.products);
			state.count = count;
			state.subTotal = subTotal;

			state.total = total;
		},

		clearCart: (state) => {
			state.products = [];
			state.count = 0;
			state.subTotal = 0;
			state.total = 0;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(
				getProductsFromCart.fulfilled,
				(state, action: PayloadAction<ICartProduct[]>) => {
					if (!action.payload) return;
					state.products = action.payload;
					const { count, subTotal, total } = cartCalculator(state.products);
					state.count = count;
					state.subTotal = subTotal;

					state.total = total;
				}
			)
			.addCase(clearProductsFromCart.fulfilled, (state) => {
				state.products = [];
				state.count = 0;
				state.subTotal = 0;
				state.total = 0;
			});
	},
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, removeFromCart, updateCart, clearCart } =
	cartSlice.actions;
export default cartSlice.reducer;

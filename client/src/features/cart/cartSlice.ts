import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct, IUpdateCartData } from "../../types/product";
import { filter, findIndex, reduce } from "lodash";
import { RootState } from "../../app/store";
import { axiosPrivate } from "../../apis/apiConfig";

interface IState {
	products: ICartProduct[];
	count: number;
	subTotal: number;
	tax?: number;
	total: number;
}

const initialState: IState = {
	products: [],
	count: 0,
	subTotal: 0,
	tax: 0,
	total: 0,
};

// 1. add product to cart
// 2. remove product from cart
// 3. update quantity (increae and decrease)
// 4. Delete All products from cart(Clear cart on succesfull order or if user wants to clear a cart)

// interface IAddToCartProduct {
// 	productId: string;
// 	quantity: number;
// 	title: string;
// 	price: number;
// 	color: string;
// 	size: string;
// }

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

//for update, need to pass action -> INCREMENT | DECREMENT | DELETEITEM
export const updateProductsFromCart = createAsyncThunk(
	"updateProductsFromCart",
	async (data: IUpdateCartData, { getState, rejectWithValue }) => {
		const userId = (getState() as RootState)?.user?.user?.id;
		// const userId = state?.user?.user?.id;
		try {
			const response = await axiosPrivate.put(`/cart/${userId}`, data);
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
			const { productId, quantity, color, size, price } = action.payload;
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

			state.count = state.products.length;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
			const { productId, color, size, price } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item.productId === productId &&
					item.color === color &&
					item.size === size
				);
			});
			state.products = filter(state.products, (_, idx) => idx !== itemIndex);
			state.count = state.products.length;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		increase: (state, action: PayloadAction<ICartProduct>) => {
			const { productId, color, size, price } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item.productId === productId &&
					item.color === color &&
					item.size === size
				);
			});
			state.products[itemIndex].quantity += 1;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		decrease: (state, action: PayloadAction<ICartProduct>) => {
			const { productId, color, size, price } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item.productId === productId &&
					item.color === color &&
					item.size === size
				);
			});
			state.products[itemIndex].quantity -= 1;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		clearCart: (state) => {
			state = initialState;
		},
	},
	extraReducers(builder) {
		builder.addCase(
			getProductsFromCart.fulfilled,
			(state, action: PayloadAction<ICartProduct[]>) => {
				state.products = action.payload;
				state.count = state.products.length;
				state.subTotal = reduce(
					state.products,
					(sum, item) => {
						return sum + item.price * item.quantity;
					},
					0
				);
				state.tax = (state.subTotal * 9) / 100;
				state.total = state.subTotal + state.tax;
			}
		);
	},
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, removeFromCart, increase, decrease } =
	cartSlice.actions;
export default cartSlice.reducer;

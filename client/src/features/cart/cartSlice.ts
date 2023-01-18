import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct } from "../../types/product";
import { filter, find, findIndex, indexOf, reduce } from "lodash";
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

export const addProductToCart = createAsyncThunk(
	"/addProductToCart",
	async (_, { rejectWithValue, getState }) => {
		const state = getState() as RootState;
		const userId = state?.user?.user?.id;
		try {
			const response = await axiosPrivate.get(`/cart/${userId}`);
			return response.data;
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error);
		}
	}
);

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartProduct>) => {
			const { _id, quantity, selectedColor, selectedSize } = action.payload;
			const hasIndex: number = findIndex(
				state.products,
				(item) =>
					item._id === _id &&
					item.selectedColor === selectedColor &&
					item.selectedSize === selectedSize
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
					return sum + item.price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
			const { _id, selectedColor, selectedSize } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item._id === _id &&
					item.selectedColor === selectedColor &&
					item.selectedSize === selectedSize
				);
			});
			state.products = filter(state.products, (_, idx) => idx !== itemIndex);
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
		},
		increase: (state, action: PayloadAction<ICartProduct>) => {
			const { _id, selectedColor, selectedSize } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item._id === _id &&
					item.selectedColor === selectedColor &&
					item.selectedSize === selectedSize
				);
			});
			state.products[itemIndex].quantity += 1;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + item.price * item.quantity;
				},
				0
			);
			state.tax = (state.subTotal * 9) / 100;
			state.total = state.subTotal + state.tax;
		},
		decrease: (state, action: PayloadAction<ICartProduct>) => {
			const { _id, selectedColor, selectedSize } = action.payload;
			const itemIndex = findIndex(state.products, (item) => {
				return (
					item._id === _id &&
					item.selectedColor === selectedColor &&
					item.selectedSize === selectedSize
				);
			});
			state.products[itemIndex].quantity -= 1;
			state.subTotal = reduce(
				state.products,
				(sum, item) => {
					return sum + item.price * item.quantity;
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
});

export const selectCart = (state: RootState) => state.cart;

export const { addToCart, removeFromCart, increase, decrease } =
	cartSlice.actions;
export default cartSlice.reducer;

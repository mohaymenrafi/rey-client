import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct } from "../../types/product";
import { filter, findIndex, reduce } from "lodash";
import { RootState } from "../../app/store";

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

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ICartProduct>) => {
			const { _id, quantity, selectedColor, selectedSize } = action.payload;
			const hasIndex: number = findIndex(
				state.products,
				(item) => item._id === _id
			);
			if (hasIndex > -1) {
				const prevItem = state.products[hasIndex];
				if (
					selectedColor === prevItem.selectedColor &&
					selectedSize === prevItem.selectedSize
				) {
					prevItem.quantity += quantity;
				} else {
					state.products.push(action.payload);
				}
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
			const { _id } = action.payload;
			state.products = filter(state.products, (item) => item._id !== _id);
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
			const { _id } = action.payload;
			const itemIndex = findIndex(state.products, (item) => item._id === _id);
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
			const { _id } = action.payload;
			const itemIndex = findIndex(state.products, (item) => item._id === _id);
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

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

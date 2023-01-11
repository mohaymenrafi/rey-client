import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { localProduct as ProductType } from "../../types/product";

interface IState {
	wishlistProducts: ProductType[];
	count: number;
}

const initialState: IState = {
	wishlistProducts: [],
	count: 0,
};

export const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlist: (state, action: PayloadAction<ProductType>) => {
			state.wishlistProducts.push(action.payload);
			state.count = state.count + 1;
		},
		removeFromWishlist: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;

			const filteredProduct = state.wishlistProducts.filter(
				(product) => product.id !== id
			);
			state.wishlistProducts = filteredProduct;
			state.count = state.wishlistProducts.length;
		},
		clearWishlistt: (state) => {
			state = initialState;
		},
	},
});

export const selectWishlist = (state: RootState) => state.wishlist;

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

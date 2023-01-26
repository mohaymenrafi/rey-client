import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IProductType as ProductType } from "../../types/product";
import { filter } from "lodash";

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
			state.wishlistProducts = filter(
				state.wishlistProducts,
				(product) => product._id !== id
			);
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

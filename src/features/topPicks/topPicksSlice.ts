import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosAuth, axiosPublic } from "../../apis/apiConfig";
import { RootState } from "../../app/store";
import { IProductType } from "../../types/product";

interface IState {
	products: IProductType[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string;
}

const initialState: IState = {
	products: [],
	loading: "idle",
	error: "",
};

export const getTopPicks = createAsyncThunk(
	"getTopPicks",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosAuth.get("/products/toppicks");
			return response.data as IProductType[];
		} catch (error: any) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error.response);
		}
	}
);

export const topPicksSlice = createSlice({
	name: "toppicks",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getTopPicks.pending, (state) => {
				state.loading = "pending";
				state.error = "";
			})
			.addCase(
				getTopPicks.fulfilled,
				(state, action: PayloadAction<IProductType[]>) => {
					state.loading = "succeeded";
					state.products = action.payload;
				}
			)
			.addCase(getTopPicks.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message || "error fetching toppicks";
			});
	},
});

export const selectTopPicks = (state: RootState) => state.topPicks;

export default topPicksSlice.reducer;

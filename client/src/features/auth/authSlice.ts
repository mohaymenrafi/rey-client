import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosPublic } from "../../apis/apiConfig";
import {
	AuthUser,
	LoginInputs,
	RegsiterInputs,
	RegsiterPostInputs,
} from "../../types/auth";
import { RootState } from "../../app/store";

interface IState {
	user: AuthUser;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}
const initialState: IState = {
	user: {
		username: "",
		firstname: "",
		lastname: "",
		email: "",
		roles: [],
		active: false,
		id: "",
		accessToken: "",
		refreshToken: "",
	},
	loading: "idle",
	error: undefined,
};

export const fetchUser = createAsyncThunk(
	"auth/fetchUser",
	async (data: LoginInputs) => {
		const response = await axiosPublic.post("/auth", data);
		return response.data;
	}
);
export const refreshToken = createAsyncThunk("auth/refresh", async () => {
	const response = await axiosPublic.get("/auth/refresh", {
		withCredentials: true,
	});
	return response.data;
});

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (data: RegsiterPostInputs) => {
		const response = await axiosPublic.post("/users", data);
		return response.data;
	}
);

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUser.pending, (state, action) => {
				state.loading = "pending";
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<AuthUser>) => {
					state.loading = "succeeded";
					state.user = action.payload;
				}
			)
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state = { ...state, ...action.payload };
				return state;
			});
	},
});

export const selectAuthUser = (state: RootState) => state.user;

export default authSlice.reducer;

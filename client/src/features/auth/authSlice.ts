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
import { stat } from "fs";

interface IState {
	user: AuthUser | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | undefined;
}
const initialState: IState = {
	user: null,
	loading: "idle",
	error: undefined,
};

export const userLogin = createAsyncThunk(
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

export const userRegistration = createAsyncThunk(
	"auth/registerUser",
	async (data: RegsiterPostInputs) => {
		const response = await axiosPublic.post("/users", data);
		return response.data;
	}
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
	const response = await axiosPublic.post("/auth/logout");
	return response.data;
});

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		Logout: (state) => {
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(userLogin.pending, (state, action) => {
				state.loading = "pending";
			})
			.addCase(
				userLogin.fulfilled,
				(state, action: PayloadAction<AuthUser>) => {
					state.loading = "succeeded";
					state.user = action.payload;
				}
			)
			.addCase(userLogin.rejected, (state, action) => {
				state.loading = "failed";
				state.error = action.error.message;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state = { ...state, ...action.payload };
				return state;
			})
			.addCase(userLogout.fulfilled, (state, action) => {
				state.user = initialState.user;
			});
	},
});

export const selectAuthUser = (state: RootState) => state.user;
export const { Logout } = authSlice.actions;
export default authSlice.reducer;

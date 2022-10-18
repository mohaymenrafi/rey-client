import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { publicReq } from "../../apis/apiConfig";
import { AuthUser, LoginInputs } from "../../types/auth";
import { RootState } from "../../app/store";

const initialState: AuthUser = {
	username: "",
	firstname: "",
	lastname: "",
	email: "",
	accessToken: "",
	roles: [],
	active: false,
	id: "",
};

export const fetchUser = createAsyncThunk(
	"auth/fetchUser",
	async (data: LoginInputs) => {
		const response = await publicReq.post("/auth", data);
		return response.data;
	}
);
export const refreshToken = createAsyncThunk("auth/refresh", async () => {
	const response = await publicReq.get("/auth/refresh", {
		withCredentials: true,
	});
	return response.data;
});

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<AuthUser>) => {
					return action.payload;
				}
			)
			.addCase(refreshToken.fulfilled, (state, action) => {
				// const updateUser = { ...state, ...action.payload };
				// return updateUser;
				state = { ...state, ...action.payload };
				return state;
			});
	},
});

export const selectAuthUser = (state: RootState) => state.user;

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosAuth, axiosPublic } from "../../apis/apiConfig";
import { AuthUser, LoginInputs, RegsiterPostInputs } from "../../types/auth";
import { RootState } from "../../app/store";

interface IError {
	message?: string;
	status?: number;
	data?: {
		message: string;
	};
}
interface IState {
	user: AuthUser | null;
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | IError;
}

interface IRefreshToken {
	accessToken: string;
}

const initialState: IState = {
	user: null,
	loading: "idle",
	error: "",
};

export const userLogin = createAsyncThunk(
	"auth/fetchUser",
	async (data: LoginInputs) => {
		const response = await axiosPublic.post("/auth", data, {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	}
);

export const userLogout = createAsyncThunk("auth/logout", async () => {
	const response = await axiosAuth.post("/auth/logout");
	return response.data;
});
export const refreshToken = createAsyncThunk<
	IRefreshToken,
	void,
	{
		rejectValue: IError;
	}
>("auth/refresh", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosPublic.get("/auth/refresh", {
			withCredentials: true,
		});
		return response.data as IRefreshToken;
	} catch (err: any) {
		if (!err.response) {
			throw err;
		}
		return rejectWithValue({
			data: err.response.data,
			status: err.response.status,
			message: err.response.statusText,
		} as IError);
	}
});

export const userRegistration = createAsyncThunk(
	"auth/registerUser",
	async (data: RegsiterPostInputs) => {
		const response = await axiosPublic.post("/users", data);
		return response.data;
	}
);

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
				state.error = "";
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
				state.error = { message: action.error.message };
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.error = "";
				if (state.user !== null) {
					state.user.accessToken = action.payload.accessToken;
				}
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = { message: action.error.message };
				}
			})

			.addCase(userLogout.fulfilled, (state, action) => {
				state.user = null;
				state.error = "";
			});
	},
});

export const selectAuthUser = (state: RootState) => state.user;
export const { Logout } = authSlice.actions;
export default authSlice.reducer;

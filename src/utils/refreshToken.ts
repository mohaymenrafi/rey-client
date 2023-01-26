import { refreshToken } from "../features/auth/authSlice";

let store: any;

export const injectStoreToGetRefreshToken = (_store: any) => {
	store = _store;
};

const getRefreshToken = async () => {
	try {
		const response = await store.dispatch(refreshToken()).unwrap();
		return response.payload;
	} catch (error) {
		console.log(error);
	}
};

export { getRefreshToken };

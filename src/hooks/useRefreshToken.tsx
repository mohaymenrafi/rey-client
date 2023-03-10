import { useAppDispatch } from "../app/hooks";
import { refreshToken, userLogout } from "../features/auth/authSlice";

const useRefreshToken = () => {
	const dispatch = useAppDispatch();
	const refresh = async () => {
		try {
			const response = await dispatch(refreshToken()).unwrap();
			return response;
		} catch (error: any) {
			console.error("Token Expired =>", error);
			if (error.status === 403 || error.status === 401) {
				try {
					await dispatch(userLogout()).unwrap();
				} catch (error) {
					console.error("logout error", error);
				}
			}
		}
	};
	return refresh;
};

export default useRefreshToken;

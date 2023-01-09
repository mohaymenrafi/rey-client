import { useAppDispatch } from "../app/hooks";
import { refreshToken, userLogout } from "../features/auth/authSlice";

const useRefreshToken = () => {
	const dispatch = useAppDispatch();
	const refresh = async () => {
		try {
			const response = await dispatch(refreshToken()).unwrap();
			return response;
		} catch (error: any) {
			console.log("Token Expired =>", error);
			if (error.status === 403) {
				await dispatch(userLogout());
			}
		}
	};
	return refresh;
};

export default useRefreshToken;

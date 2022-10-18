import { useAppDispatch } from "../app/hooks";
import { refreshToken } from "../features/auth/authSlice";

const useRefreshToken = () => {
	const dispatch = useAppDispatch();
	const refresh = async () => {
		const updateRes = await dispatch(refreshToken());
		return updateRes.payload;
	};
	return refresh;
};

export default useRefreshToken;

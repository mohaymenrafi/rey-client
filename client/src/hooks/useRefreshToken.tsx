import React from "react";
import { publicReq } from "../apis/apiConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { refreshToken, selectAuthUser } from "../features/auth/authSlice";

const useRefreshToken = () => {
	const user = useAppSelector(selectAuthUser);
	const dispatch = useAppDispatch();
	const refresh = async () => {
		const updateRes = await dispatch(refreshToken());
	};
	return refresh;
};

export default useRefreshToken;

import { useEffect } from "react";
import { axiosPrivate } from "../apis/apiConfig";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userLogout, selectAuthUser } from "../features/auth/authSlice";
import useRefreshToken from "./useRefreshToken";
import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { Logout } from "../features/auth/authSlice";

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { user } = useAppSelector(selectAuthUser);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				config.headers = config.headers ?? {};
				if (!config?.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response.status === 403 && !prevRequest?.sent) {
					prevRequest.send = true;
					const newToken = await refresh();
					console.log(newToken);
					const accessToken = newToken.accessToken;
					prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
					return axiosPrivate(prevRequest);
				} else {
					console.log(error);
					dispatch(userLogout());
					return Promise.reject(error);
				}
			}
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [user, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;

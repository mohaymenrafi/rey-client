import { useEffect } from "react";
import { axiosPrivate } from "../apis/apiConfig";
import { useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/auth/authSlice";
import useRefreshToken from "./useRefreshToken";
import { AxiosRequestConfig } from "axios";

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const user = useAppSelector(selectAuthUser);

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
					const { accessToken } = await refresh();
					prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
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

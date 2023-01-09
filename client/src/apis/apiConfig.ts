import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { selectAuthUser } from "../features/auth/authSlice";
import useRefreshToken from "../hooks/useRefreshToken";

const BASE_URL = "http://localhost:5000/api";

const axiosPublic = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// let store: any;

// export const injectStoreToAxios = (_store: any) => {
// 	store = _store;
// };

// const requestIntercept = axiosPrivate.interceptors.request.use(
// 	(config: AxiosRequestConfig) => {
// 		// console.log(config);
// 		config.headers = config.headers ?? {};
// 		if (!config?.headers["Authorization"]) {
// 			config.headers["Authorization"] = `Bearer ${
// 				store.getState().user.user.accessToken
// 			}`;
// 		}
// 		// console.log(config);
// 		return config;
// 	},
// 	(error: AxiosError): Promise<AxiosError> => Promise.reject(error)
// );

// const responseIntercept = axiosPrivate.interceptors.response.use(
// 	(response) => response,
// 	async (error: AxiosError): Promise<AxiosError> => {
// 		const prevRequest = error?.config as IReqConfig;
// 		if (error?.response?.status === 403 && !prevRequest?.sent) {
// 			console.log(prevRequest.sent);
// 			prevRequest.sent = true;
// 			console.log("REPEATED IF BLOCK IS CALLING");
// 			const newToken = await getRefreshToken();
// 			const accessToken = newToken.accessToken;
// 			prevRequest.headers = { ...prevRequest.headers };
// 			prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
// 			return axiosPrivate(prevRequest);
// 		}
// 		return Promise.reject(error);
// 	}
// );
// axiosPrivate.interceptors.request.eject(requestIntercept);
// axiosPrivate.interceptors.response.eject(responseIntercept);

interface IReqConfig extends AxiosRequestConfig {
	sent?: boolean;
}
interface IProps {
	children: JSX.Element;
}

const AxiosPrivateInterceptor = ({ children }: IProps) => {
	const { user } = useAppSelector(selectAuthUser);
	const refresh = useRefreshToken();
	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				config.headers = config.headers ?? {};
				if (!config?.headers["Authorization"]) {
					config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
				}
				return config;
			},
			(error: AxiosError): Promise<AxiosError> => Promise.reject(error)
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error: AxiosError): Promise<AxiosError> => {
				const prevRequest = error?.config as IReqConfig;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newToken = await refresh();
					const accessToken = newToken?.accessToken;
					prevRequest.headers = { ...prevRequest.headers };
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

	return children;
};

export { axiosPublic, axiosPrivate };
export default AxiosPrivateInterceptor;

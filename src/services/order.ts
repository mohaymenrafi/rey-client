import { axiosPrivate } from "../apis/apiConfig";

export const getUserOrder = (id: string) => {
	return axiosPrivate.get(`/orders/${id}`);
};

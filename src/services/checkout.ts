import { axiosPublic } from "../apis/apiConfig";

export const createCheckoutSession = (id: string) => {
	return axiosPublic.post(`/create-checkout-session/${id}`);
};

import { axiosPublic } from "../apis/apiConfig";

export const getSingleItem = (id: string) => {
	return axiosPublic(`/products/${id}`);
};

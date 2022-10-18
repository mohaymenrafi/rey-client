import axios from "axios";

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

export { axiosPublic, axiosPrivate };

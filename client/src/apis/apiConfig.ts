import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const publicReq = axios.create({
	baseURL: BASE_URL,
	headers: {
		withCredentinals: true,
		"Content-Type": "application/json",
	},
});

export { publicReq };

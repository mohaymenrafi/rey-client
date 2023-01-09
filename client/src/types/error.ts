export interface IRejectError {
	status: number;
	statusText: string;
	responseType: string;
	responseText: {
		message: string;
	};
	response: {
		message: string;
	};
}

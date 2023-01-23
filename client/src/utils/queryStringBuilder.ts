interface IProps {
	category?: string;
	size?: string;
	color?: string;
}

export const queryString = (filters: IProps): string => {
	const url = Object.entries(filters)
		.filter(([key, value]) => !!value)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
	return url;
};

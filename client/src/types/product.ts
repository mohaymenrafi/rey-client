export type Product = {
	name: string;
	price: string;
	description: string;
	color: string;
	category: string;
	id: string;
};
export type localProduct = {
	img: string;
	title: string;
	desc: string;
	price: number;
	categories: string[];
	size: string[];
	color: string[];
	inStock: boolean;
	id: string;
	sale?: {
		active?: boolean;
		type?: string;
		amount?: number;
	};
};

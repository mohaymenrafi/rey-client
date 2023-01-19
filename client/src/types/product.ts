export type Product = {
	name: string;
	price: string;
	description: string;
	color: string;
	category: string;
	id: string;
};
export interface IProductType {
	img: string;
	title: string;
	desc: string;
	price: number;
	categories: string[];
	size: string[];
	color: string[];
	inStock: boolean;
	id?: string;
	sale?: {
		active: boolean;
		type: string;
		amount: number;
	};
	_id: string;
}

export interface ICartProduct {
	title: string;
	productId: string;
	img: string;
	quantity: number;
	color: string;
	size: string;
	price: number;
}

export interface IUpdateCartData extends ICartProduct {
	action: "INCREMENT" | "DECREMENT" | "DELETEITEM";
}

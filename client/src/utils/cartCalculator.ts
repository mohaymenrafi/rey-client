import { reduce } from "lodash";
import { ICartProduct } from "../types/product";

export function cartCalculator(products: ICartProduct[]) {
	const count = products.length;
	const subTotal = reduce(
		products,
		(sum, item) => {
			return sum + item.price * item.quantity;
		},
		0
	);
	const tax = (subTotal * 9) / 100;
	const total = subTotal + tax;

	return {
		count,
		subTotal,
		tax,
		total,
	};
}

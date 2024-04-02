import { reduce } from "lodash";
import { ICartProduct } from "../types/product";

export function cartCalculator(products: ICartProduct[]) {
	const count = products.length;
	const subTotal = reduce(
		products,
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const total = subTotal;

	return {
		count,
		subTotal,
		total,
	};
}

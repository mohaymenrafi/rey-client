import { faker } from "@faker-js/faker";
import { Product } from "../types/product";

export const PRODUCTS: Product[] = [];

export function createRandomProduct(): Product {
	return {
		name: faker.commerce.productName(),
		price: faker.commerce.price(10, 100, 2, "$"),
		description: faker.commerce.productDescription(),
		color: faker.color.human(),
		category: faker.commerce.department(),
		id: faker.datatype.uuid(),
	};
}

export function createFakeProduct() {
	Array.from({ length: 10 }).forEach(() => {
		PRODUCTS.push(createRandomProduct());
	});
}

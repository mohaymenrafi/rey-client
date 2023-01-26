export function formatPrice(number: number) {
	const usd = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(number / 100);

	return usd;
}

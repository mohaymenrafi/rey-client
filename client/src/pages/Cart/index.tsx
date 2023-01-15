import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { selectCart } from "../../features/cart/cartSlice";
const ContainerExtended = styled(Container)`
	padding-top: 30px;
	padding-bottom: 50px;
	max-width: ${theme.sc.md};
`;

const CartTable = styled.table`
	display: flex;
	flex-direction: column;
	/* grid-column: 2/3; */
	margin: 20px;
	margin-bottom: 0;
	text-align: center;
	thead {
		border-bottom: 2px solid ${theme.col.darkBlue};
	}
	tr {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		margin-top: -1px;
		color: ${theme.col.gray};
		row-gap: 50px;
	}
	td {
		font-size: ${theme.fs.base};
		font-weight: 500;
	}
	tbody tr {
		padding-top: 15px;
		padding-bottom: 15px;
	}
	tbody tr:hover {
		background-color: ${theme.col["white-2"]};
	}
	.first {
		width: 55%;
		text-align: left;
	}
	.second {
		width: 20%;
	}
	.third {
		width: 25%;
		text-align: right;
	}
`;

const TotalContainer = styled.div`
	width: 300px;
	padding-top: 15px;
	margin-left: auto;
	margin-right: 20px;
	padding-right: 8px;
	border-top: 2px solid ${theme.col["darkBlue"]};
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	font-weight: 500;
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

const CheckoutButton = styled.button`
	background-color: ${theme.col.darkBlue};
	border: 2px solid ${theme.col.darkBlue};
	padding: 11px 32px;
	margin-top: 15px;
	font-weight: 500;
	color: ${theme.col.white};
	&:hover {
		border-color: ${theme.col.darkBlue};
		color: ${theme.col.darkBlue};
		background-color: ${theme.col.white};
		cursor: pointer;
	}
`;

const CartPage = () => {
	const { products, count } = useAppSelector(selectCart);
	console.log(products);
	return (
		<ContainerExtended>
			<CartTable>
				<thead>
					<tr>
						<th className="first">Product Name</th>
						<th className="second">Quantity</th>
						<th className="third">Subtotal</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="first">Chair</td>
						<td className="second">5</td>
						<td className="third">$500</td>
					</tr>
					<tr>
						<td className="first">MX mechanical</td>
						<td className="second">1</td>
						<td className="third"> $100</td>
					</tr>
					<tr>
						<td className="first">Table</td>
						<td className="second">1</td>
						<td className="third">$100</td>
					</tr>
				</tbody>
			</CartTable>
			<TotalContainer>
				<div>
					<span>Subtotal</span>
					<span>$1200</span>
				</div>
				<div>
					<span>Tax</span>
					<span>$300</span>
				</div>
				<div>
					<span>Total</span>
					<span>$1500</span>
				</div>
				<CheckoutButton>Proceed To Checkout</CheckoutButton>
			</TotalContainer>
		</ContainerExtended>
	);
};

export default CartPage;

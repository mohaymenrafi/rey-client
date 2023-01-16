import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { selectCart } from "../../features/cart/cartSlice";
import { map } from "lodash";
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

const CartTitle = styled.span`
	display: block;
`;

const ItemInfo = styled.span`
	display: inline-block;
	text-transform: uppercase;
	font-size: ${theme.fs.xs};
	font-weight: 600;
`;

const CartPage = () => {
	const { products, count, subTotal, tax, total } = useAppSelector(selectCart);

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
					{map(products, (item, idx) => {
						return (
							<tr key={idx}>
								<td className="first">
									<CartTitle>{item.title}</CartTitle>
									<ItemInfo>
										{item.selectedColor}, {item.selectedSize}
									</ItemInfo>
								</td>
								<td className="second">{item.quantity}</td>
								<td className="third"> ${item.quantity * item.price}</td>
							</tr>
						);
					})}
				</tbody>
			</CartTable>
			<TotalContainer>
				<div>
					<span>Subtotal</span>
					<span>${subTotal}</span>
				</div>
				<div>
					<span>Tax</span>
					<span>${tax}</span>
				</div>
				<div>
					<span>Total</span>
					<span>${total}</span>
				</div>
				<CheckoutButton>Proceed To Checkout</CheckoutButton>
			</TotalContainer>
		</ContainerExtended>
	);
};

export default CartPage;

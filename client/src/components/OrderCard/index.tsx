import styled from "styled-components";
import { theme } from "../../styles/theme";
import { IOrders } from "../../pages/MyAccount";
import { formatPrice } from "../../utils/currencyFormatter";
import moment from "moment";

const OrderCardContainer = styled.div`
	border: 1px solid ${theme.col["gray-3"]};
	border-radius: 5px;
	overflow: hidden;
`;
const TopBar = styled.div`
	background-color: ${theme.col.lightGray};

	padding: 15px;
	display: flex;
	justify-content: space-between;
`;
const TopInfoContainer = styled.div`
	display: flex;
	column-gap: 20px;
`;
const TopInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: ${theme.fs.sm};
	font-weight: 400;
	h3 {
		font-weight: 600;
		font-size: ${theme.fs.sm};
	}
	span {
		font-weight: 600;
	}
	@media (min-width: ${theme.sc.lg}) {
		font-size: ${theme.fs.base};
		h3 {
			font-weight: 600;
			font-size: ${theme.fs.base};
		}
	}
`;
const TopInfoRight = styled(TopInfo)`
	text-align: right;
`;
const OrderBody = styled.div`
	padding: 15px;
	display: flex;
	overflow-x: auto;
`;

const ItemDetails = styled.div`
	text-align: center;
	img {
		width: 150px;
		@media (min-width: ${theme.sc.lg}) {
			width: 250px;
		}
		height: 100%;
		object-fit: contain;
	}
	p {
	}
`;

interface IProps {
	order: IOrders;
}

const OrderCard = ({ order }: IProps) => {
	return (
		<OrderCardContainer>
			<TopBar>
				<TopInfoContainer>
					<TopInfo>
						<h3>ORDER PLACED</h3>
						<p>{moment(order.createdAt).format("Do MMMM YYYY")}</p>
					</TopInfo>
					<TopInfo>
						<h3>TOTAL</h3>
						<p>{formatPrice(order.totalPrice)}</p>
					</TopInfo>
				</TopInfoContainer>
				<TopInfoRight>
					<p>
						<span>Order ID: </span>
						{order._id}
					</p>
					<p>
						<span>{order.products.length}</span> Items
					</p>
				</TopInfoRight>
			</TopBar>
			<OrderBody>
				{order.allImages.map((url, idx) => (
					<ItemDetails key={idx}>
						<img src={url} alt="product img" />
					</ItemDetails>
				))}
			</OrderBody>
		</OrderCardContainer>
	);
};

export default OrderCard;

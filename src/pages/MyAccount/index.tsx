import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Loader from "../../components/Loader";
import OrderCard from "../../components/OrderCard";
import { selectAuthUser } from "../../features/auth/authSlice";
import { getUserOrder } from "../../services/order";
import { Title } from "../../styles/CommonStyles";
import Container from "../../styles/Container";

const ContainerExtended = styled(Container)`
	padding: 30px 15px 50px;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 20px;
`;

const SectionTitle = styled(Title)`
	text-align: left;
`;

export interface IOrderProduct {
	productId: string;
	img: string;
	title: string;
	quantity: number;
	price: number;
	size: string;
	color: string;
	_id: string;
}
export interface IOrders {
	_id: string;
	userId: string;
	allImages: string[];
	totalPrice: number;
	delivered: string;
	createdAt: string;
	updatedAt: string;
	products: IOrderProduct[];
}

const MyAccount = () => {
	const { user } = useAppSelector(selectAuthUser);
	const [orders, setOrders] = useState<IOrders[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	useEffect(() => {
		setLoading(true);
		const getOrders = async () => {
			try {
				const response = await getUserOrder(user?.id || "0");
				setOrders(response.data);
				setLoading(false);
			} catch (error) {
				console.log("get order error", error);
				setLoading(false);
			}
		};
		getOrders();
	}, []);
	if (loading) {
		return <Loader />;
	}
	return (
		<ContainerExtended>
			<SectionTitle>My Orders</SectionTitle>
			{orders.length ? (
				orders.map((order) => <OrderCard key={order._id} order={order} />)
			) : (
				<>
					<h2>You do not have any orders yet!</h2>
					<h2>
						{" "}
						Visit our <Link to="/products">Shop</Link> page to order{" "}
					</h2>
				</>
			)}
		</ContainerExtended>
	);
};

export default MyAccount;

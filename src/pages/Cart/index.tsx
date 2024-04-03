import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import {
	addToCart,
	getProductsFromCart,
	removeFromCart,
	selectCart,
	updateCart,
	updateProductsFromCart,
} from "../../features/cart/cartSlice";
import { map } from "lodash";
import { AiOutlineMinus, AiOutlinePlus, AiFillDelete } from "react-icons/ai";
import { ICartProduct } from "../../types/product";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { formatPrice } from "../../utils/currencyFormatter";
import { createCheckoutSession } from "../../services/checkout";
import { selectAuthUser } from "../../features/auth/authSlice";
import { productColorName } from "../../utils/productColorName";
import { Link } from "react-router-dom";

const ContainerExtended = styled(Container)`
	padding-top: 30px;
	padding-bottom: 50px;
	max-width: ${theme.sc.lg};
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
	.imgCol {
		width: 20%;
		text-align: left;
		padding: 15px;
		img {
			width: 90%;
		}
	}
	.nameCol {
		width: 40%;
		text-align: left;
	}
	.quantityCol {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 7px;
		svg {
			cursor: pointer;
		}
	}
	.totalCol {
		width: 20%;
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

const DeleteButton = styled.button`
	display: block;
	background-color: transparent;
	border: none;
	outline: none;
	margin-top: 7px;
	font-size: ${theme.fs.sm};
	cursor: pointer;
	display: flex;
	align-items: center;
	column-gap: 10px;
	@media (min-width: ${theme.sc.md}) {
		font-size: ${theme.fs.base};
	}
`;

const EmptyCart = styled.div`
	font-size: ${theme.fs["lg-2"]};
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 481px);
`;

const CartPage = () => {
	const [loading, setLoading] = useState(false);
	const { products, subTotal, total } = useAppSelector(selectCart);
	const { user } = useAppSelector(selectAuthUser);
	const dispatch = useAppDispatch();
	const handleIncrease = async (item: ICartProduct): Promise<void> => {
		dispatch(updateCart({ product: item, operation: "INCREASE" }));
		try {
			await dispatch(
				updateProductsFromCart({ ...item, action: "INCREMENT" })
			).unwrap();
		} catch (error) {
			dispatch(updateCart({ product: item, operation: "DECREASE" }));
			console.log("cart increase error", error);
		}
	};
	const handleDecrease = async (item: ICartProduct): Promise<void> => {
		if (item.quantity > 1) {
			dispatch(updateCart({ product: item, operation: "DECREASE" }));
			try {
				await dispatch(
					updateProductsFromCart({ ...item, action: "DECREMENT" })
				).unwrap();
			} catch (error) {
				dispatch(updateCart({ product: item, operation: "INCREASE" }));
				console.log("cart increase error", error);
			}
		}
	};
	const handleDelete = async (item: ICartProduct): Promise<void> => {
		dispatch(removeFromCart(item));
		try {
			await dispatch(
				updateProductsFromCart({ ...item, action: "DELETEITEM" })
			).unwrap();
		} catch (error) {
			dispatch(addToCart(item));
			console.log("cart increase error", error);
		}
	};
	useEffect(() => {
		const getCart = async () => {
			setLoading(true);
			try {
				await dispatch(getProductsFromCart()).unwrap();
				setLoading(false);
			} catch (error) {
				console.log("Cart load error", error);
				setLoading(false);
			}
		};
		getCart();
	}, []);

	const handleCheckout = async (): Promise<void> => {
		if (user !== null) {
			try {
				const response = await createCheckoutSession(user.id);
				console.log(response.data);
				const { url } = response.data;
				window.location.href = url;
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (loading) {
		return <Loader />;
	}
	return (
		<ContainerExtended>
			{products.length ? (
				<>
					<CartTable>
						<thead>
							<tr>
								<th className="imgCol">Image</th>
								<th className="nameCol">Product Name</th>
								<th className="quantityCol">Quantity</th>
								<th className="totalCol">Subtotal</th>
							</tr>
						</thead>
						<tbody>
							{map(products, (item, idx) => {
								return (
									<tr key={idx}>
										<td className="imgCol">
											<img src={item.img} alt={item.title} />
										</td>
										<td className="nameCol">
											<Link to={`/product/${item.productId}`}>
												<CartTitle>{item.title}</CartTitle>
											</Link>
											<ItemInfo>
												{productColorName[item.color]}, {item.size}
											</ItemInfo>
											<DeleteButton onClick={() => handleDelete(item)}>
												<span> Remove from cart</span>
												<AiFillDelete />
											</DeleteButton>
										</td>
										<td className="quantityCol">
											<AiOutlineMinus onClick={() => handleDecrease(item)} />
											{item.quantity}
											<AiOutlinePlus onClick={() => handleIncrease(item)} />
										</td>
										<td className="totalCol">
											{" "}
											{formatPrice(item.quantity * item.price)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</CartTable>
					<TotalContainer>
						<div>
							<span>Subtotal</span>
							<span>{formatPrice(subTotal)}</span>
						</div>
						<div>
							<span>Tax will be calculated based on shipping address</span>
							<span></span>
						</div>
						<div>
							<span>Total</span>
							<span>{formatPrice(total)}</span>
						</div>
						<CheckoutButton onClick={handleCheckout}>
							Proceed To Checkout
						</CheckoutButton>
					</TotalContainer>
				</>
			) : (
				<EmptyCart>
					<span>No Products in the cart</span>
				</EmptyCart>
			)}
		</ContainerExtended>
	);
};

export default CartPage;

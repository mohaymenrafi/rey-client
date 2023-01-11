import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { localProduct } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	addToWishlist,
	selectWishlist,
} from "../../features/wishlist/wishlistSlice";

const CardContainer = styled.div`
	position: relative;
	border-radius: 25px;
	padding: 30px 15px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border: 3px solid ${theme.col.lightGray};

	@media (min-width: ${theme.sc.xs}) {
		padding: 15px;
	}
	@media (min-width: ${theme.sc.sm}) {
		padding: 30px 15px;
	}

	&::before {
		position: absolute;
		content: "";
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 0px 0px ${theme.col.lightGray};
		border-radius: 25px;
		z-index: -1;
		transform-origin: center center;
		transition: box-shadow 0.2s ease-out;
	}

	&:hover {
		&::before {
			box-shadow: 0px 0px 0px 15px ${theme.col.lightGray};
		}
	}

	/* img {
		width: 65%;
		align-self: center;
	} */

	h2 {
		color: ${theme.col["black-2"]};
		font-size: ${theme.fs.base};
		font-weight: 500;
		margin: 10px 0;
		margin-bottom: 20px;
		cursor: pointer;
	}
	@media (min-width: ${theme.sc.lg}) {
		padding: 30px;
		h2 {
			font-size: ${theme.fs["md"]};
		}
	}
`;
const Category = styled.p`
	color: #c7cace;
	font-size: ${theme.fs.xxs};
	text-transform: uppercase;
	font-weight: 600;
	@media (min-width: ${theme.sc.lg}) {
		font-size: ${theme.fs.xs};
	}
`;
const Price = styled.p<{ isHover: boolean; sale: boolean }>`
	color: ${theme.col.gray};
	font-size: ${theme.fs.sm};
	font-weight: 600;
	transition: all 0.2s ease;
	opacity: ${(props) => (props.isHover ? 0 : 1)};
	transform: ${(props) =>
		props.isHover ? "translateY(-20px)" : "translateY(0px)"};
	display: flex;
	align-items: center;
	column-gap: 20px;
	.mainPrice {
		text-decoration: ${(props) => props.sale && "line-through"};
	}
	.salePrice {
		color: ${theme.col.darkBlue};
	}

	@media (min-width: ${theme.sc.lg}) {
		font-size: ${theme.fs.base};
	}
`;

const ViewDetails = styled.div<{ isHover: boolean }>`
	display: flex;
	align-items: center;
	transition: all 0.3s ease;
	opacity: ${(props) => (props.isHover ? 1 : 0)};
	transform: ${(props) =>
		props.isHover ? "translateY(-20px)" : "translateY(0px)"};
	& > *:not(:last-child) {
		margin-right: 20px;
	}
`;

const View = styled.span`
	text-transform: capitalize;
	font-weight: 600;
	position: relative;
	cursor: pointer;
	font-size: ${theme.fs.sm};
	&::after {
		position: absolute;
		content: "";
		width: 100%;
		height: 2px;
		background-color: ${theme.col.gray};
		left: 0;
		bottom: -2px;
		transform: scaleX(0);
		transform-origin: center left;
		transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	&:hover::after {
		transform: scaleX(1);
	}
`;
const Icon = styled.span`
	cursor: pointer;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
const Thumbnail = styled.div`
	height: 310px;
	align-self: center;
	@media (min-width: ${theme.sc.xs}) {
		height: 210px;
	}
`;

const StockOut = styled.p`
	font-size: ${theme.fs.base};
	color: ${theme.col.red};
`;

const SaleNotice = styled.p`
	background: ${theme.col.darkBlue};
	padding: 4px 12px;
	color: ${theme.col.white};
	font-size: ${theme.fs.xs};
	font-weight: 600;
	position: absolute;
	top: 20px;
	right: 15px;
`;

interface IProps {
	item: localProduct;
}

const ProductCard: FC<IProps> = ({ item }) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isSale, setIsSale] = useState<boolean>(false);
	const [salePrice, setSalePrice] = useState<number>();
	const dispatch = useAppDispatch();
	const { count, wishlistProducts } = useAppSelector(selectWishlist);

	const handleWishlist = (item: localProduct): void => {
		dispatch(addToWishlist(item));
	};
	useEffect(() => {
		console.log(count);
	}, [count]);

	useEffect(() => {
		if (item.sale) {
			setIsSale(item.sale.active);
			if (item.sale.type === "flat") {
				setSalePrice(item.price - item.sale.amount);
			} else {
				const saleAmount = (item.sale.amount / 100) * item.price;
				setSalePrice(item.price - saleAmount);
			}
		}
	}, [item]);
	return (
		<CardContainer
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{isSale && (
				<SaleNotice>
					{item?.sale?.type === "flat" ? (
						<>-${item?.sale?.amount} FLAT OFF</>
					) : (
						<>-{item?.sale?.amount}% OFF</>
					)}
				</SaleNotice>
			)}
			<Thumbnail>
				<Image src={item?.img} alt={item.title} />
			</Thumbnail>
			<Category>
				{item?.categories.map((cat, idx) => (
					<span key={idx}>{cat}</span>
				))}
			</Category>
			<h2>
				<Link to={`/products/${item?._id}`}>{item?.title}</Link>
			</h2>
			{/* TODO: convert the prices from cent to actual prices and also use localization, use function */}
			<Price isHover={isHover} sale={isSale}>
				<span className="mainPrice">${item?.price}</span>
				{isSale && <span className="salePrice">${salePrice}</span>}
			</Price>
			{/* TODO: later add tooltip from mui  */}

			<ViewDetails isHover={isHover}>
				{item?.inStock ? (
					<>
						<Link to={`/products/${item?._id}`}>
							<View>view details</View>
						</Link>
						<Icon>
							<AiOutlineShoppingCart />
						</Icon>
						<Icon onClick={() => handleWishlist(item)}>
							<MdFavoriteBorder />
						</Icon>
					</>
				) : (
					<StockOut>This product is currently out of stock.</StockOut>
				)}
			</ViewDetails>
		</CardContainer>
	);
};

export default ProductCard;

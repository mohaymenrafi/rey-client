import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { IProductType } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	addToWishlist,
	removeFromWishlist,
	selectWishlist,
} from "../../features/wishlist/wishlistSlice";
import { findIndex } from "lodash";
import { formatPrice } from "../../utils/currencyFormatter";
import "react-toastify/dist/ReactToastify.css";
import { successToast } from "../../utils/showToast";
import { selectAuthUser } from "../../features/auth/authSlice";

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
	margin-top: 4px;
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
	item: IProductType;
}

const ProductCard: FC<IProps> = ({ item }) => {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isSale, setIsSale] = useState<boolean>(false);
	const [isFavourite, setIsFavourite] = useState<boolean>(false);
	const [salePrice, setSalePrice] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { wishlistProducts } = useAppSelector(selectWishlist);
	const { user } = useAppSelector(selectAuthUser);

	const handleAddToWishlist = (item: IProductType): void => {
		dispatch(addToWishlist(item));
		successToast("product added to wishlist");
	};
	const handleRemoveFromWishlist = (item: IProductType): void => {
		dispatch(removeFromWishlist({ id: item._id }));
	};

	useEffect(() => {
		if (wishlistProducts) {
			const isFound: number = findIndex(
				wishlistProducts,
				(product) => product._id === item._id
			);
			if (isFound > -1) {
				setIsFavourite(true);
			} else {
				setIsFavourite(false);
			}
		}
	}, [wishlistProducts, item]);

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
						<>-{formatPrice(item?.sale?.amount)} FLAT OFF</>
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
				<Link to={`/product/${item?._id}`}>{item?.title}</Link>
			</h2>

			<Price isHover={isHover} sale={isSale}>
				<span className="mainPrice">{formatPrice(item?.price)}</span>
				{isSale && <span className="salePrice">{formatPrice(salePrice)}</span>}
			</Price>

			<ViewDetails isHover={isHover}>
				{item?.inStock ? (
					<>
						<View>
							<Link to={`/product/${item?._id}`}>view details</Link>
						</View>

						{isFavourite ? (
							<Icon onClick={() => handleRemoveFromWishlist(item)}>
								<MdFavorite />
							</Icon>
						) : (
							<Icon onClick={() => handleAddToWishlist(item)}>
								<MdFavoriteBorder />
							</Icon>
						)}
					</>
				) : (
					<StockOut>This product is currently out of stock.</StockOut>
				)}
			</ViewDetails>
		</CardContainer>
	);
};

export default ProductCard;

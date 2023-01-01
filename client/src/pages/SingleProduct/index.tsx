import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { BsPatchCheck } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
	FaLinkedinIn,
	FaFacebook,
	FaTwitter,
	FaPinterest,
	FaEnvelope,
} from "react-icons/fa";
import { Text } from "../../styles/text";
import { useParams } from "react-router-dom";
import { localProduct as Products } from "../../localData";
import { localProduct } from "../../types/product";

const ContainerExtended = styled(Container)`
	padding-top: 30px;
	padding-bottom: 50px;
`;

const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	row-gap: 30px;
	@media (min-width: ${theme.sc.md}) {
		grid-template-columns: repeat(2, 2fr);
		row-gap: 70px;
	}
`;

const Image = styled.img`
	width: 100%;
`;

const InfoDiv = styled.div`
	background-color: ${theme.col.skyblue};
	padding: 15px;
`;
const Category = styled.div`
	font-size: ${theme.fs.xs};
	text-transform: uppercase;
	font-weight: 600;
	color: ${theme.col["gray-2"]};
	margin-bottom: 30px;
`;

const Title = styled.h2`
	font-size: ${theme.fs["lg-2"]};
	color: ${theme.col.gray};
	font-weight: 500;
	margin-bottom: 20px;
`;

const Brand = styled.p`
	font-size: ${theme.fs.xs};
	font-weight: 600;
	color: ${theme.col.gray};
	margin-bottom: 15px;
`;
const Price = styled.p`
	font-size: ${theme.fs["md-2"]};
	font-weight: 600;
	margin-bottom: 15px;
	display: flex;
	column-gap: 20px;
	align-items: center;
`;
const Regular = styled.p<{ sale: boolean }>`
	color: ${theme.col.gray};
	text-decoration: ${(props) => props.sale && "line-through"};
	font-weight: ${(props) => props.sale && 500};
`;
const Sale = styled.p`
	color: ${theme.col.darkBlue};
`;
const PriceOff = styled.p`
	background: ${theme.col.darkBlue};
	padding: 8px 13px;
	color: ${theme.col.white};
	font-size: ${theme.fs.sm};
	font-weight: 500;
`;

const InStock = styled.p<{ stock: boolean }>`
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	color: ${(props) => (props.stock ? theme.col.gray : theme.col.red)};
	span {
		margin-left: 7px;
		text-transform: uppercase;
		font-size: ${theme.fs.xs};
		font-weight: 600;
		/* color: ${theme.col.gray}; */
	}
`;

const AddToCart = styled.div`
	background-color: ${theme.col.darkBlue};
	overflow: hidden;
	border-radius: 2px;
	display: flex;
	align-items: stretch;
	margin-bottom: 20px;

	input[type="number"] {
		font-weight: 600;
		background: ${theme.col.white};
		border: none;
		outline: none;
		width: 50px;
		padding: 8px;
		margin: 5px;
	}
	button {
		flex-grow: 1;
		background: transparent;
		border: none;
		color: ${theme.col.white};
		text-transform: uppercase;
		font-weight: 500;
		font-size: ${theme.fs.sm};
		cursor: pointer;
		:hover {
			background: ${theme.col.blueHover};
		}
		:disabled {
			background: ${theme.col.gray};
		}
	}
`;

const AddToWishlist = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-bottom: 15px;
	span {
		margin-left: 7px;
	}
`;

const Share = styled.div`
	display: flex;
	align-items: center;
	column-gap: 10px;
	span {
		margin-left: 7px;
		margin-top: 2px;
		text-transform: uppercase;
		font-size: ${theme.fs.xs};
		font-weight: 600;
		color: ${theme.col.gray};
	}
`;
const ShareIcons = styled.div`
	display: flex;
	align-items: center;
	column-gap: 17px;
	color: ${theme.col.gray};
`;

const DetailsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 20px;
	h2 {
		font-size: ${theme.fs["md-3"]};
		font-weight: 600;
		color: ${theme.col.gray};
		margin-bottom: 20px;
	}
	@media (min-width: 768px) {
		grid-column: span 2;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 30px;
	}
`;
const Description = styled.div``;
const Information = styled.div``;
const Specifications = styled.div``;
const InfoHeader = styled.h3`
	font-size: ${theme.fs.base};
	font-weight: 600;
	margin-bottom: 10px;
	color: ${theme.col.gray};
`;

const SpecContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	row-gap: 10px;
`;

const SpecInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

const Key = styled.span`
	text-transform: uppercase;
	font-size: ${theme.fs.xs};
	font-weight: 600;
	color: ${theme.col.gray};
`;
const Value = styled.span`
	font-size: ${theme.fs.xs};
	font-weight: 500;
	color: ${theme.col.gray};
`;

// Related Products
const RelatedProductsContainer = styled.div`
	h2 {
		font-size: ${theme.fs.md};
		text-transform: uppercase;
		color: ${theme.col.gray};
		font-weight: 600;
		margin-bottom: 25px;
	}
	@media (min-width: 768px) {
		grid-column: span 2;
	}
`;

const RelatedProducts = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 15px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

const SingleProduct = () => {
	const { id } = useParams();
	const [cartAmount, setCartAmount] = useState<number>(1);
	const [wishList, setWishList] = useState<boolean>(false);
	const [product, setProduct] = useState<localProduct | undefined>();
	const [stock, setStock] = useState<boolean>(true);
	const [isSale, setIsSale] = useState<boolean>(false);
	const [salePrice, setSalePrice] = useState<number>();

	useEffect(() => {
		const item = Products.find((item) => item.id === id);
		if (item) {
			setProduct(item);
			setStock(item.inStock);
			setIsSale(item.sale.active);
			if (item.sale.active) {
				if (item.sale.type === "flat") {
					setSalePrice(item.price - item.sale.amount);
				} else {
					const saleAmount = (item.sale.amount / 100) * item.price;
					setSalePrice(item.price - saleAmount);
				}
			}
		}
	}, [id]);

	const handleCartAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let { value } = e.target;
		let intValue = parseInt(value);
		if (intValue >= 1) setCartAmount(intValue);
	};
	const handleAddToCart = () => {
		console.log(cartAmount);
	};
	const handleWishlist = () => {
		setWishList((prev) => !prev);
	};
	useEffect(() => {
		console.log(wishList);
	}, [wishList]);
	return (
		<ContainerExtended>
			<Layout>
				<div>
					<Image src={product?.img} alt={product?.title} />
				</div>
				<InfoDiv>
					<Category>
						{product?.categories.map((cat, idx) => (
							<p key={idx}>{cat}</p>
						))}
					</Category>
					<Title>{product?.title}</Title>
					{/* <Brand>IGUERA</Brand> */}
					{/* convert price from cents to price and also add localization  */}
					<Price>
						<Regular sale={isSale}>${product?.price}</Regular>
						{isSale && (
							<>
								<Sale>${salePrice}</Sale>
								<PriceOff>
									{product?.sale?.type === "flat" ? (
										<>-${product?.sale?.amount} FLAT OFF</>
									) : (
										<span>-{product?.sale?.amount}% OFF</span>
									)}
								</PriceOff>
							</>
						)}
					</Price>
					<Text>{product?.desc}</Text>
					<InStock stock={stock}>
						{product?.inStock ? (
							<>
								<BsPatchCheck />
								<span>In stock</span>
							</>
						) : (
							<>
								<GiCancel />
								<span>Out of stock</span>
							</>
						)}
					</InStock>
					{stock && (
						<AddToCart>
							<input
								type="number"
								value={cartAmount}
								onChange={handleCartAmount}
							/>
							<button disabled={!product?.inStock} onClick={handleAddToCart}>
								Add to cart
							</button>
						</AddToCart>
					)}
					<AddToWishlist onClick={handleWishlist}>
						{wishList ? (
							<>
								<AiFillHeart />
								<span>Added to Wishlist</span>
							</>
						) : (
							<>
								<AiOutlineHeart />
								<span>Add to Wishlist</span>
							</>
						)}
					</AddToWishlist>
					<Share>
						<span>Share</span>
						<ShareIcons>
							<FaLinkedinIn />
							<FaFacebook />
							<FaTwitter />
							<FaPinterest />
							<FaEnvelope />
						</ShareIcons>
					</Share>
				</InfoDiv>
				<DetailsContainer>
					<Description>
						<h2>Description</h2>
						<Text>
							Compellingly grow performance based mindshare through parallel
							potentialities. Rapidiously underwhelm top-line catalysts for
							change before best-of-breed materials. Competently brand timely
							catalysts for change through sustainable systems. Completely
							expedite ubiquitous bandwidth after integrated action items.
							Progressively transform leading-edge supply chains whereas
							flexible niche markets.
						</Text>
					</Description>
					<Information>
						<h2>Information</h2>
						<InfoHeader>Shipping</InfoHeader>
						<Text>
							We currently offer free shipping worldwide on all orders over
							$100.
						</Text>
						<InfoHeader>Return & exchange</InfoHeader>
						<Text>
							If you are not satisfied with your purchase you can return it to
							us within 14 days for an exchange or refund. More info.
						</Text>
						<InfoHeader>Assistance</InfoHeader>
						<Text>
							Contact us on (+44) 555 88 65, or email us at
							support@reytheme.com.
						</Text>
					</Information>
					<Specifications>
						<h2>Specification</h2>
						<SpecContainer>
							<SpecInfo>
								<Key>Brand</Key>
								<Value>Iguera</Value>
							</SpecInfo>
							<SpecInfo>
								<Key>Material</Key>
								<Value>Lether</Value>
							</SpecInfo>
							<SpecInfo>
								<Key>Color</Key>
								<Value>Grey,Musterds</Value>
							</SpecInfo>
						</SpecContainer>
					</Specifications>
				</DetailsContainer>

				<RelatedProductsContainer>
					<h2>Related Products</h2>
					<RelatedProducts>
						{Array.from({ length: 4 }).map((item, idx) => (
							// <ProductCard />
							<p key={idx}> Need to add related products to show data</p>
						))}
					</RelatedProducts>
				</RelatedProductsContainer>
			</Layout>
		</ContainerExtended>
	);
};

export default SingleProduct;

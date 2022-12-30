import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { BsPatchCheck } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
	FaLinkedinIn,
	FaFacebook,
	FaTwitter,
	FaPinterest,
	FaEnvelope,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Text } from "../../styles/text";
import { ProductCard } from "../../components";

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
	color: ${theme.col.gray};
	margin-bottom: 15px;
`;

const InStock = styled.p`
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	span {
		margin-left: 7px;
		text-transform: uppercase;
		font-size: ${theme.fs.xs};
		font-weight: 600;
		color: ${theme.col.gray};
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
	const [cartAmount, setCartAmount] = useState<number>(1);
	const [wishList, setWishList] = useState<boolean>(false);

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
					<Image
						src="https://demos.reytheme.com/frankfurt/wp-content/uploads/sites/15/2019/06/18-1536x1024.jpg"
						alt="product-img"
					/>
				</div>
				<InfoDiv>
					<Category>Storage</Category>
					<Title>Anderson Chest Of Drawers, Mocha</Title>
					<Brand>IGUERA</Brand>
					<Price>$99.99</Price>
					<Text>
						Proactively communicate corporate process improvements via corporate
						scenarios. Progressively aggregate proactive data after diverse
						users. Rapidiously redefine front-end interfaces before go forward
						process improvements.
					</Text>
					<InStock>
						<BsPatchCheck />
						<span>In stock</span>
					</InStock>
					<AddToCart>
						<input
							type="number"
							value={cartAmount}
							onChange={handleCartAmount}
						/>
						<button onClick={handleAddToCart}>Add to cart</button>
					</AddToCart>
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

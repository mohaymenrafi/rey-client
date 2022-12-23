import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { BsPatchCheck } from "react-icons/bs";
import React, { useState } from "react";

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
	}
`;

const Image = styled.img`
	width: 100%;
	/* border: 1px solid black; */
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
	font-size: ${theme.fs.xl};
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

const ShortDescription = styled.p`
	margin-bottom: 15px;
	line-height: 1.7em;
`;

const InStock = styled.p`
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	span {
		margin-left: 10px;
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

const SingleProduct = () => {
	const [cartAmount, setCartAmount] = useState<number>(1);

	const handleCartAmount = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let { value } = e.target;
		let intValue = parseInt(value);
		if (intValue >= 1) setCartAmount(intValue);
	};
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
					<ShortDescription>
						Proactively communicate corporate process improvements via corporate
						scenarios. Progressively aggregate proactive data after diverse
						users. Rapidiously redefine front-end interfaces before go forward
						process improvements.
					</ShortDescription>
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
						<button>Add to cart</button>
					</AddToCart>
					{/*<AddToWishlist>Add to Wishlist</AddToWishlist>
					<Share>Share Icons</Share> */}
				</InfoDiv>
				{/* <div>
					<Description>
						Compellingly grow performance based mindshare through parallel
						potentialities. Rapidiously underwhelm top-line catalysts for change
						before best-of-breed materials. Competently brand timely catalysts
						for change through sustainable systems. Completely expedite
						ubiquitous bandwidth after integrated action items. Progressively
						transform leading-edge supply chains whereas flexible niche markets.
					</Description>
					<Information>
						<InfoHeader>Shipping</InfoHeader>
						<InfoDescription>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime,
							accusantium ducimus aspernatur nam sapiente iste!
						</InfoDescription>
						<InfoHeader>Shipping</InfoHeader>
						<InfoDescription>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime,
							accusantium ducimus aspernatur nam sapiente iste!
						</InfoDescription>
						<InfoHeader>Shipping</InfoHeader>
						<InfoDescription>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime,
							accusantium ducimus aspernatur nam sapiente iste!
						</InfoDescription>
					</Information>
					<Specifications>Specification Details</Specifications>
				</div> */}
				{/* TODO: add related products */}
			</Layout>
		</ContainerExtended>
	);
};

export default SingleProduct;

import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import ShopBanner from "../../assets/bg-cover.webp";
import { theme } from "../../styles/theme";
import { CardContainer } from "../../components/TopPicks";
import { ProductCard } from "../../components";

const productAmount: number[] = [
	1, 23, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

const ContainerExtended = styled(Container)`
	background: url("${ShopBanner}") no-repeat center center;
	background-size: cover;
	overflow: hidden;
	border-radius: 5px;
	padding: 140px 40px 40px 40px;
	margin: 20px auto;
`;
const Title = styled.h1`
	font-size: 60px;
	font-weight: 800;
	background-color: ${theme.col["white-2"]};
	padding: 15px 40px 5px;
	display: inline-block;
`;

const CategoryBox = styled.div`
	background-color: ${theme.col["white-2"]};
	padding: 15px 40px;
	display: inline-block;
	text-transform: uppercase;
	font-weight: 500;
	font-size: ${theme.fs.sm};

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5em;

		li {
			list-style: none;
			cursor: pointer;
			position: relative;
			&::after {
				transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
				transform-origin: center left;
				position: absolute;
				content: "";
				bottom: 0;
				width: 100%;
				height: 2px;
				background-color: ${theme.col.black};
				display: block;
				transform: scaleX(0);
			}
			&:hover {
				&::after {
					transform: scaleX(1);
				}
			}
		}
	}
`;

const categories: string[] = [
	"All",
	"Beds",
	"Chairs",
	"Lighting",
	"Sofas",
	"Storage",
	"Tables",
];

const SpacerDiv = styled.div``;

const Shop = () => {
	return (
		<>
			<ContainerExtended>
				<Title>SHOP</Title>
				<SpacerDiv />
				<CategoryBox>
					<ul>
						{categories.map((item) => (
							<li>{item}</li>
						))}
					</ul>
				</CategoryBox>
			</ContainerExtended>
			<Container>
				<CardContainer>
					{productAmount.map((item, index) => (
						<ProductCard key={index} />
					))}
				</CardContainer>
			</Container>
		</>
	);
};

export default Shop;

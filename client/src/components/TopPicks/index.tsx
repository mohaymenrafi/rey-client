import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "../../features/product/productSlice";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import ProductCard from "../ProductCard";

const ContainerExtended = styled(Container)`
	padding: 50px 15px;
`;

const SectionTitle = styled.h2`
	font-size: ${theme.fs["lg-2"]};
	text-align: center;
	color: ${theme.col["black-2"]};
	font-weight: 600;
`;

export const CardContainer = styled.div`
	padding: 30px 0;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-row-gap: 25px;
	@media (min-width: ${theme.sc.sm}) {
		grid-template-columns: repeat(3, 1fr);
		grid-column-gap: 25px;
	}
	@media (min-width: ${theme.sc.lg}) {
		padding-top: 50px;
		grid-template-columns: repeat(4, 1fr);
	}
	@media (min-width: ${theme.sc["2xl"]}) {
		grid-template-columns: repeat(5, 1fr);
	}
`;

const TopPicks = () => {
	const { products } = useAppSelector(selectAllProducts);
	return (
		<ContainerExtended>
			<SectionTitle>BEST SELLING PICKS</SectionTitle>

			<CardContainer>
				{products.products.slice(5, 9).map((item, index) => (
					<ProductCard item={item} key={index} />
				))}
			</CardContainer>
		</ContainerExtended>
	);
};

export default TopPicks;

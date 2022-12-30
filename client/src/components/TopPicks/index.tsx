import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { SmallText } from "../../styles/SmallText";
import { theme } from "../../styles/theme";
import ProductCard from "../ProductCard";

const picks: number[] = [1, 2, 4, 5];

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
	return (
		<ContainerExtended>
			<SectionTitle>BEST SELLING PICKS</SectionTitle>

			<CardContainer>
				{picks.map((item, index) => (
					// <ProductCard key={index} />
					<p key={index}>TOP picks , need to pass actual product items</p>
				))}
			</CardContainer>
		</ContainerExtended>
	);
};

export default TopPicks;

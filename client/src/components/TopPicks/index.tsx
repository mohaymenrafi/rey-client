import { map } from "lodash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAllProducts } from "../../features/product/productSlice";
import {
	getTopPicks,
	selectTopPicks,
} from "../../features/topPicks/topPicksSlice";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { IProductType } from "../../types/product";
import Loader from "../Loader";
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
	const { products, loading, error } = useAppSelector(selectTopPicks);

	if (loading === "pending") return <Loader />;
	if (error) {
		return <h2>There's some error, please try again</h2>;
	}
	return (
		<ContainerExtended>
			<SectionTitle>BEST SELLING</SectionTitle>

			<CardContainer>
				{products.map((item: IProductType, index: number) => (
					<ProductCard item={item} key={index} />
				))}
			</CardContainer>
		</ContainerExtended>
	);
};

export default TopPicks;

import { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import ShopBanner from "../../assets/bg-cover.webp";
import { theme } from "../../styles/theme";
import { ProductCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	getAllProducts,
	selectAllProducts,
} from "../../features/product/productSlice";
import Loader from "../../components/Loader";
import Pagination from "@mui/material/Pagination";

const PaginationContainer = styled(Container)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px auto 40px;
`;

const ContainerExtended = styled(Container)`
	background: url("${ShopBanner}") no-repeat center center;
	background-size: cover;
	overflow: hidden;
	border-radius: 5px;
	padding: 140px 40px 40px 40px;
	margin: 20px auto;
`;

const CardContainer = styled.div`
	padding: 30px 0;
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 15px;
	@media (min-width: ${theme.sc.xs}) {
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 25px;
	}
	@media (min-width: ${theme.sc.lg}) {
		padding-top: 50px;
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: ${theme.sc.xl}) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (min-width: ${theme.sc["2xl"]}) {
		grid-template-columns: repeat(5, 1fr);
	}
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

const NoProducts = styled.p`
	color: ${theme.col.black};
	font-size: ${theme.fs.xl};
	font-weight: 600;
	padding: 30px;
	text-align: center;
	grid-column: 1/-1;
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

const Error = styled.div`
	min-height: calc(100vh - 400px);
	display: flex;
	justify-content: center;
	align-items: center;
	h2 {
		font-size: ${theme.fs.lg};
		font-weight: 700;
		color: ${theme.col.darkBlue};
	}
`;

const Shop = () => {
	const dispatch = useAppDispatch();
	const {
		products: { products, totalPages },
		loading,
		error,
	} = useAppSelector(selectAllProducts);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(12);
	const [categoryFilter, setCategoryFilter] = useState<string>("");

	const loadProducts = async () => {
		try {
			await dispatch(getAllProducts({ limit, page, categoryFilter })).unwrap();
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadProducts();
	}, [page, categoryFilter]);

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const handleCatClick = (item: string): void => {
		if (item.toLowerCase() === "all") {
			setCategoryFilter("");
		} else {
			setCategoryFilter(item.toLowerCase());
		}
		setPage(1);
	};

	if (error) {
		console.log(error);
		return (
			<Error>
				<h2>Error loading products, please try again</h2>
			</Error>
		);
	}

	return (
		<>
			<ContainerExtended>
				<Title>SHOP</Title>
				<SpacerDiv />
				<CategoryBox>
					<ul>
						{categories.map((item, idx) => (
							<li key={idx} onClick={() => handleCatClick(item)}>
								{item}
							</li>
						))}
					</ul>
				</CategoryBox>
			</ContainerExtended>
			{loading === "pending" ? (
				<Loader />
			) : (
				<>
					<Container>
						<CardContainer>
							{products?.length ? (
								products.map((item, index) => (
									<ProductCard item={item} key={index} />
								))
							) : (
								<NoProducts>No Products Found</NoProducts>
							)}
						</CardContainer>
					</Container>
					<PaginationContainer>
						<Pagination
							count={totalPages}
							variant="outlined"
							color="primary"
							boundaryCount={1}
							siblingCount={0}
							page={page}
							onChange={handleChange}
						/>
					</PaginationContainer>{" "}
				</>
			)}
		</>
	);
};

export default Shop;

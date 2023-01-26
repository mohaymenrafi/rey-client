import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";

export const ContainerExtended = styled(Container)`
	padding-top: 30px;
	padding-bottom: 50px;
`;

export const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	row-gap: 30px;
	@media (min-width: ${theme.sc.md}) {
		grid-template-columns: repeat(2, 2fr);
		row-gap: 70px;
	}
`;

export const Image = styled.img`
	width: 100%;
`;

export const InfoDiv = styled.div`
	background-color: ${theme.col.skyblue};
	padding: 15px;
`;
export const Category = styled.div`
	font-size: ${theme.fs.xs};
	text-transform: uppercase;
	font-weight: 600;
	color: ${theme.col["gray-2"]};
	margin-bottom: 30px;
`;

export const Title = styled.h2`
	font-size: ${theme.fs["lg-2"]};
	color: ${theme.col.gray};
	font-weight: 500;
	margin-bottom: 20px;
	@media (min-width: ${theme.sc.lg}) {
		font-size: ${theme.fs["xl"]};
	}
`;

export const Brand = styled.p`
	font-size: ${theme.fs.xs};
	font-weight: 600;
	color: ${theme.col.gray};
	margin-bottom: 15px;
`;
export const Price = styled.p`
	font-size: ${theme.fs["md-2"]};
	font-weight: 600;
	margin-bottom: 15px;
	display: flex;
	column-gap: 20px;
	align-items: center;
`;
export const Regular = styled.span<{ sale: boolean }>`
	color: ${theme.col.gray};
	text-decoration: ${(props) => props.sale && "line-through"};
	font-weight: ${(props) => props.sale && 500};
`;
export const Sale = styled.span`
	color: ${theme.col.darkBlue};
`;
export const PriceOff = styled.span`
	background: ${theme.col.darkBlue};
	padding: 8px 13px;
	color: ${theme.col.white};
	font-size: ${theme.fs.sm};
	font-weight: 500;
`;

export const InStock = styled.p<{ stock: boolean }>`
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

export const AddToCart = styled.div`
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

export const AddToWishlist = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	margin-bottom: 15px;
	span {
		margin-left: 7px;
	}
`;

export const Share = styled.div`
	display: flex;
	align-items: center;
	column-gap: 10px;
	span {
		margin-top: -2px;
		text-transform: uppercase;
		font-size: ${theme.fs.xs};
		font-weight: 600;
		color: ${theme.col.gray};
	}
`;
export const ShareIcons = styled.div`
	display: flex;
	align-items: center;
	column-gap: 17px;
	color: ${theme.col.gray};
`;

export const DetailsContainer = styled.div`
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
export const Description = styled.div``;
export const Information = styled.div``;
export const Specifications = styled.div``;
export const InfoHeader = styled.h3`
	font-size: ${theme.fs.base};
	font-weight: 600;
	margin-bottom: 10px;
	color: ${theme.col.gray};
`;

export const SpecContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	row-gap: 10px;
`;

export const SpecInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 10px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

export const Key = styled.span`
	text-transform: uppercase;
	font-size: ${theme.fs.xs};
	font-weight: 600;
	color: ${theme.col.gray};
`;
export const Value = styled.span`
	font-size: ${theme.fs.xs};
	font-weight: 500;
	color: ${theme.col.gray};
`;

// Related Products
export const RelatedProductsContainer = styled.div`
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

export const RelatedProducts = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 15px;
	@media (min-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

export const ColorVariation = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	column-gap: 15px;
	span {
		cursor: pointer;
	}
	margin-bottom: 10px;
	p {
		font-weight: 500;
	}
`;
export const Color = styled.button<{ bgColor: string }>`
	height: 15px;
	width: 15px;
	background-color: ${(props) => props.bgColor};
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.3);
	cursor: pointer;
	outline: 3px solid transparent;
`;

export const SizeVariation = styled.div`
	margin-bottom: 15px;
	label {
		font-weight: 500;
	}
`;

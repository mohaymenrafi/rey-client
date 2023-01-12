import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { ProductCard } from "../../components";
import { CardContainer } from "../../components/TopPicks";
import { selectWishlist } from "../../features/wishlist/wishlistSlice";
import { Title } from "../../styles/CommonStyles";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";

const NoProducts = styled.p`
	color: ${theme.col.black};
	font-size: ${theme.fs.xl};
	font-weight: 600;
	padding: 30px;
	text-align: center;
	grid-column: 1/-1;
`;
const SectionTitle = styled(Title)`
	text-align: left;
`;

const WishlistPage = () => {
	const { wishlistProducts: products } = useAppSelector(selectWishlist);

	return (
		<Container>
			<SectionTitle>Wishlist</SectionTitle>
			{
				<CardContainer>
					{!!products.length ? (
						products.map((item, index) => (
							<ProductCard item={item} key={index} />
						))
					) : (
						<NoProducts>No Products Found</NoProducts>
					)}
				</CardContainer>
			}
		</Container>
	);
};

export default WishlistPage;

import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { CartIcon, Icon, IHeaderProps, Logo, Left } from ".";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../features/cart/cartSlice";
import { MdFavoriteBorder } from "react-icons/md";
import { selectAuthUser } from "../../features/auth/authSlice";
import { selectWishlist } from "../../features/wishlist/wishlistSlice";

const MobileNav = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 30px 15px;
	ul {
		display: flex;
		justify-content: flex-end;
		li {
			display: flex;
			margin-left: 16px;
		}
	}
	@media (min-width: ${theme.sc.lg}) {
		display: none;
	}
`;

const UserName = styled.span`
	font-size: ${theme.fs.base};
`;

const Mobile: React.FC<IHeaderProps> = ({ logo, menuItem }) => {
	const [open, setOpen] = useState<boolean>(false);
	const { count } = useAppSelector(selectCart);
	const { user } = useAppSelector(selectAuthUser);
	const { count: wishlistCount } = useAppSelector(selectWishlist);
	return (
		<>
			<MobileNav>
				<Left>
					<Link to="/">
						<Logo src={logo} alt="site logo" aria-label="logo" />
					</Link>
					<Icon onClick={() => setOpen(true)}>
						<GiHamburgerMenu />
					</Icon>
				</Left>
				<ul>
					<li>
						<Link to="/wishlist">
							<CartIcon amount={wishlistCount}>
								<MdFavoriteBorder />
							</CartIcon>
						</Link>
					</li>
					<li>
						<Link to="/cart">
							<CartIcon amount={count}>
								<BsBag />
							</CartIcon>
						</Link>
					</li>
					<li>
						<Link to="/my-account">
							<Icon>
								<FiUser />
								{user && <UserName> ({user.username})</UserName>}
							</Icon>
						</Link>
					</li>
				</ul>
			</MobileNav>
			<MobileMenu logo={logo} open={open} setOpen={setOpen} />
		</>
	);
};

export default Mobile;

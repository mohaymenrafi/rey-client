import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { Icon, IHeaderProps, Logo, Left } from ".";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../features/cart/cartSlice";
import { MdFavoriteBorder } from "react-icons/md";
import { selectAuthUser } from "../../features/auth/authSlice";
import { selectWishlist } from "../../features/wishlist/wishlistSlice";
import IconText from "../Common/IconText";

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
	const navigate = useNavigate();
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
						<Link to="/wishlist"></Link>
						<IconText
							func={() => navigate("wishlist")}
							text={wishlistCount}
							IconEl={MdFavoriteBorder}
						/>
					</li>
					<li>
						<IconText
							func={() => navigate("cart")}
							text={count}
							IconEl={BsBag}
						/>
					</li>
					<li>
						<Icon onClick={() => navigate("/my-account")}>
							<FiUser />
							{user && <UserName> ({user.username})</UserName>}
						</Icon>
					</li>
				</ul>
			</MobileNav>
			<MobileMenu logo={logo} open={open} setOpen={setOpen} />
		</>
	);
};

export default Mobile;

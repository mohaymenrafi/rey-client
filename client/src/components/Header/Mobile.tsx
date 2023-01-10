import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { CartIcon, Icon, IHeaderProps, Logo, Left } from ".";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

let amount: number = 3;
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

const Mobile: React.FC<IHeaderProps> = ({ logo, menuItem }) => {
	const [open, setOpen] = useState<boolean>(false);
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
					{/* <li>
						<Icon>
							<FiSearch />
						</Icon>
					</li> */}
					<li>
						<Link to="/cart">
							<CartIcon amount={amount}>
								<BsBag />
							</CartIcon>
						</Link>
					</li>
					<li>
						<Link to="/my-account">
							<Icon>
								<FiUser />
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

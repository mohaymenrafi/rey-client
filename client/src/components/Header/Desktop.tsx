import { map } from "lodash";
import React from "react";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { CartIcon, Icon, IHeaderProps, Logo } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userLogout, selectAuthUser } from "../../features/auth/authSlice";
import { selectCart } from "../../features/cart/cartSlice";
import { SmallText } from "../../styles/SmallText";
import { theme } from "../../styles/theme";

const DesktopNav = styled.div`
	display: none;
	padding: 30px 15px;
	@media (min-width: ${theme.sc.lg}) {
		display: grid;
	}
	grid-template-columns: repeat(3, 1fr);
	align-items: center;
	ul {
		display: flex;
		list-style: none;
		column-gap: 15px;
	}
	a {
		text-decoration: none;
		color: inherit;
		font-weight: 500;
		text-transform: uppercase;
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
`;

// const CartIcon = styled(Icon)`
// `

const Right = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	column-gap: 10px;
`;
const LogoutButton = styled(SmallText)`
	cursor: pointer;
`;

const Desktop: React.FC<IHeaderProps> = ({ logo, menuItem }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector(selectAuthUser);
	const { count } = useAppSelector(selectCart);
	const handleLogout = async () => {
		try {
			await dispatch(userLogout()).unwrap();
		} catch (error) {
			console.error("logout error", error);
		}
	};
	const hanldeLogoClick = () => {
		navigate("/");
	};
	const activeStyle = {
		fontWeight: "bold",
	};
	return (
		<DesktopNav>
			<ul>
				{map(menuItem, (item, idx) => (
					<NavLink
						key={idx}
						to={item.url}
						// style={({ isActive }) => (isActive ? activeStyle : {})}
					>
						{item.name}
					</NavLink>
				))}
			</ul>
			<Logo
				src={logo}
				alt="site logo"
				aria-label="logo"
				onClick={hanldeLogoClick}
			/>
			<Right>
				<CartIcon amount={count}>
					<Link to="/cart">
						<Icon>
							<BsBag />
						</Icon>
					</Link>
				</CartIcon>
				{user ? (
					<>
						<SmallText>
							<Link to="/my-account">
								ACCOUNT {user && `(${user.username})`}{" "}
							</Link>
						</SmallText>
						<LogoutButton onClick={handleLogout}>
							<a>LOGOUT</a>
						</LogoutButton>
					</>
				) : (
					<SmallText>
						<Link to="/login">Login </Link>
					</SmallText>
				)}
			</Right>
		</DesktopNav>
	);
};

export default Desktop;

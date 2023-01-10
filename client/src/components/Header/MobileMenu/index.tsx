import styled from "styled-components";
import { theme } from "../../../styles/theme";
import { FC } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAuthUser, userLogout } from "../../../features/auth/authSlice";

export interface IHeaderProps {
	logo: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	// menuItem: IMenuItem[];
}

const mobileMenuItems: { name: string; url: string }[] = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "Shop",
		url: "/products",
	},
	{
		name: "My Account",
		url: "/my-account",
	},
	{
		name: "Wishlist",
		url: "/wishlist",
	},
	{
		name: "Cart",
		url: "/cart",
	},
	{
		name: "Contact",
		url: "/contact",
	},
];

const Container = styled.div<{ open: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 100;
	background-color: ${theme.col.white};
	padding: 20px 30px;
	transform: ${(props) =>
		props.open ? "translateX(0)" : "translateX(-100vw)"};
	transition: transform 0.3s ease-in-out;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid ${theme.col.black};
	padding-bottom: 20px;
`;
const Logo = styled.img`
	width: 60px;
`;
const BackButton = styled.button`
	border: 0px;
	background-color: transparent;
	font-size: 22px;
	padding: 0px;
	cursor: pointer;
`;

const Body = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	row-gap: 15px;

	a,
	span {
		font-size: ${theme.fs.base};
		font-weight: 500;
		cursor: pointer;
	}
`;

let activeStyle = {
	fontWeight: "600 ",
};

const MobileMenu: FC<IHeaderProps> = ({ logo, setOpen, open }) => {
	const { user } = useAppSelector(selectAuthUser);
	const dispatch = useAppDispatch();
	const handleLogout = async () => {
		await dispatch(userLogout());
		setOpen(false);
	};
	return (
		<Container open={open}>
			<Header>
				<Logo src={logo} alt={"site logo"} aria-label="site logo" />
				<BackButton aria-label="back-button" onClick={() => setOpen(false)}>
					<IoMdArrowBack />
				</BackButton>
			</Header>
			<Body>
				{mobileMenuItems.map((item, idx) => (
					<NavLink
						to={`${item.url}`}
						key={idx}
						onClick={() => setOpen(false)}
						style={({ isActive }) => (isActive ? activeStyle : {})}
					>
						{item.name}
					</NavLink>
				))}
				{user ? (
					<span onClick={handleLogout}>Logout</span>
				) : (
					<>
						<NavLink
							to="/login"
							onClick={() => setOpen(false)}
							style={({ isActive }) => (isActive ? activeStyle : {})}
						>
							Login
						</NavLink>
						<NavLink
							onClick={() => setOpen(false)}
							to="/register"
							style={({ isActive }) => (isActive ? activeStyle : {})}
						>
							Register
						</NavLink>
					</>
				)}
			</Body>
		</Container>
	);
};

export default MobileMenu;

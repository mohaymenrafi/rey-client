import React from "react";
import { Outlet } from "react-router-dom";
import Globalstyle from "../../styles/globalstyle";
import Footer from "../Footer";
import Header from "../Header";
import Theme from "../Theme";
import styled from "styled-components";
import { Toaster } from "sonner";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;
const Main = styled.main`
	flex-grow: 1;
`;
const ToastContainer = styled.div`
	[data-rich-colors="true"] [data-sonner-toast][data-type="success"],
	[data-rich-colors="true"]
		[data-sonner-toast][data-type="success"]
		[data-close-button] {
		padding: 12px 20px;
	}
`;

const Layout = () => {
	return (
		<Theme>
			<Globalstyle />
			<Container>
				<Header />
				<Main>
					<Outlet />
				</Main>
				<Footer />
			</Container>
			<ToastContainer>
				<Toaster richColors position="top-right" />
			</ToastContainer>
		</Theme>
	);
};

export default Layout;

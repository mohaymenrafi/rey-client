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
			<Toaster
				richColors
				toastOptions={{
					style: {
						padding: "8px 12px",
					},
				}}
				closeButton
				position="top-right"
			/>
		</Theme>
	);
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Globalstyle from "../../styles/globalstyle";
import Footer from "../Footer";
import Header from "../Header";
import Theme from "../Theme";

const Layout = () => {
	return (
		<Theme>
			<Globalstyle />
			<Header />
			<Outlet />
			<Footer />
		</Theme>
	);
};

export default Layout;

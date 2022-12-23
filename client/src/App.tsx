import { Route, Routes } from "react-router-dom";
import { Laylout } from "./components";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Laylout />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="products/id" element={<SingleProduct />} />
				<Route path="contact" element={<Contact />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;

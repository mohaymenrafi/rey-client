import { Route, Routes } from "react-router-dom";
import { Laylout } from "./components";
import {
	Home,
	Contact,
	Shop,
	Login,
	Register,
	WishlistPage,
	CartPage,
	SingleProduct,
} from "./pages";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Laylout />}>
				<Route index element={<Home />} />
				<Route path="products" element={<Shop />} />
				<Route path="products/:id" element={<SingleProduct />} />
				<Route path="cart" element={<CartPage />} />
				<Route path="wishlist" element={<WishlistPage />} />
				<Route path="contact" element={<Contact />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default App;

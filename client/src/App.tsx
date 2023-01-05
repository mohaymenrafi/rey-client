import { Route, Routes } from "react-router-dom";
import { Laylout, PrivateRoute } from "./components";
import {
	Home,
	Contact,
	Shop,
	Login,
	Register,
	WishlistPage,
	CartPage,
	SingleProduct,
	MyAccount,
} from "./pages";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Laylout />}>
				<Route index element={<Home />} />
				{/* <Route element={<PrivateRoute  />}>
				</Route> */}

				<Route
					path="products"
					element={
						<PrivateRoute>
							<Shop />
						</PrivateRoute>
					}
				/>

				<Route path="products/:id" element={<SingleProduct />} />
				<Route path="cart" element={<CartPage />} />
				<Route path="wishlist" element={<WishlistPage />} />
				<Route path="contact" element={<Contact />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="my-account"
					element={
						<PrivateRoute>
							<MyAccount />
						</PrivateRoute>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { Laylout, PrivateRoute } from "./components";
import { selectAuthUser } from "./features/auth/authSlice";
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
	const { user } = useAppSelector(selectAuthUser);
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
				<Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
				<Route
					path="register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
				<Route path="my-account" element={<MyAccount />} />
			</Route>
		</Routes>
	);
}

export default App;

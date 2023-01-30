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
	Success,
} from "./pages";

function App() {
	const { user } = useAppSelector(selectAuthUser);
	return (
		<Routes>
			<Route path="/" element={<Laylout />}>
				<Route index element={<Home />} />
				<Route path="products" element={<Shop />} />

				<Route
					path="my-account"
					element={
						<PrivateRoute>
							<MyAccount />
						</PrivateRoute>
					}
				/>
				<Route
					path="cart"
					element={
						<PrivateRoute>
							<CartPage />
						</PrivateRoute>
					}
				/>
				<Route path="wishlist" element={<WishlistPage />} />
				<Route
					path="order/success"
					element={
						<PrivateRoute>
							<Success />
						</PrivateRoute>
					}
				/>
				<Route path="products/:id" element={<SingleProduct />} />

				<Route path="contact" element={<Contact />} />
				<Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
				<Route
					path="register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
			</Route>
		</Routes>
	);
}

export default App;

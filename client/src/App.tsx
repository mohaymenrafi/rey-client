import { Route, Routes } from "react-router-dom";
import { Laylout } from "./components";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Laylout />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="contact" element={<Contact />} />
				<Route path="login" element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;

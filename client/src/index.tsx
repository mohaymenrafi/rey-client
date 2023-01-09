import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { persistor, store } from "./app/store";
import { store } from "./app/store";
import ScrollToTop from "./components/ScrollToTop";
// import { PersistGate } from "redux-persist/integration/react";
import AxiosPrivateInterceptor from "./apis/apiConfig";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		{/* <PersistGate loading={null} persistor={persistor}> */}
		<AxiosPrivateInterceptor>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</BrowserRouter>
		</AxiosPrivateInterceptor>
		{/* </PersistGate> */}
	</Provider>
	// </React.StrictMode>
);

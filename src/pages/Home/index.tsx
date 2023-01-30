import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
	Banner,
	DisplayCatOne,
	DisplayCatTwo,
	TopPicks,
	HotspotBanner,
	Logos,
} from "../../components";
import Loader from "../../components/Loader";
import { getProductsFromCart } from "../../features/cart/cartSlice";
import { getTopPicks } from "../../features/topPicks/topPicksSlice";

interface CustomizedState {
	from: {
		hash: string;
		key: string;
		pathname: string;
		search: string;
		state: null;
	};
}

export default function Home() {
	const dispatch = useAppDispatch();

	const loadTopPicks = async () => {
		try {
			await dispatch(getTopPicks()).unwrap();
		} catch (error) {
			console.log("top picks fetch error", error);
		}
	};
	const loadCart = async () => {
		try {
			await dispatch(getProductsFromCart()).unwrap();
		} catch (error: any) {
			console.log("cart load error", error);
		}
	};
	useEffect(() => {
		loadTopPicks();
		loadCart();
	}, []);

	return (
		<>
			<Banner />
			<DisplayCatOne />
			<DisplayCatTwo />
			<TopPicks />
			<HotspotBanner />
			<Logos />
		</>
	);
}

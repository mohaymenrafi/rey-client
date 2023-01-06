import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Banner,
	DisplayCatOne,
	DisplayCatTwo,
	TopPicks,
	HotspotBanner,
	Logos,
} from "../../components";

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

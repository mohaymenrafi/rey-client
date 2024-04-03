import { useNavigate } from "react-router-dom";

const useNavigateToShop = (cat: string) => {
	const naviagte = useNavigate();
	const navigateToShop = () => {
		naviagte("/products/", { state: { cat } });
	};
	return { navigateToShop };
};

export default useNavigateToShop;

import { useNavigate } from "react-router-dom";

const useNavigateToShop = () => {
	const naviagte = useNavigate();
	const navigateToShop = () => {
		naviagte("/products");
	};
	return { navigateToShop };
};

export default useNavigateToShop;

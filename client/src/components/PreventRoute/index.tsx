import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuthUser } from "../../features/auth/authSlice";

interface IProps {
	children: JSX.Element;
}

//TODO: if user is already logged in, then redirect to home page or return to previous page

const PreventRoute: FC<IProps> = ({ children }) => {
	const { user } = useAppSelector(selectAuthUser);
	const location = useLocation();
	if (user) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}
	return children;
};

export default PreventRoute;

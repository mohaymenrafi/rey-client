import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAuthUser } from "../../features/auth/authSlice";

interface IProps {
	children: JSX.Element;
}

const PrivateRoute: FC<IProps> = ({ children }) => {
	const { user } = useAppSelector(selectAuthUser);
	const location = useLocation();
	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return children;
};

export default PrivateRoute;

import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputs } from "../../types/auth";
import { Title } from "../../styles/CommonStyles";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUser, selectAuthUser } from "../../features/auth/authSlice";
import useRefreshToken from "../../hooks/useRefreshToken";

const ContainerExtended = styled(Container)`
	padding: 50px;
	display: flex;
	justify-content: center;
	align-content: center;
`;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;

	input {
		padding: ${theme.spacing["15"]};
		margin: 5px auto;
		width: 300px;
		border: 1px solid ${theme.col.lightGray};
		border-radius: 3px;
		font-size: ${theme.fs.base};
	}
	input[type="submit"] {
		cursor: pointer;
		background-color: ${theme.col.lightGray};
		transition: all 0.2s ease;
		:hover {
			background-color: ${theme.col.black};
			color: ${theme.col.white};
		}
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	font-size: ${theme.fs.sm};
`;

const Login = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectAuthUser);
	const refresh = useRefreshToken();

	const nagivate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>();
	const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
		const authSuccess = await dispatch(fetchUser(data));
		if (fetchUser.fulfilled.match(authSuccess)) {
			// nagivate("/"); navigatet to the page after login
		} else {
			if (authSuccess.payload) {
				console.error(authSuccess.payload);
			} else {
				console.error(authSuccess.error.message);
			}
		}
	};

	const handleClick = async () => {
		const newToken = await refresh();
		console.log(newToken);
	};

	return (
		<ContainerExtended>
			<div>
				<Title>Sign In {user?.username}</Title>
				<FormContainer onSubmit={handleSubmit(onSubmit)}>
					<input
						placeholder="username"
						{...register("username", { required: true })}
					/>

					<input
						type="password"
						placeholder="password"
						{...register("password", { required: true })}
					/>

					{errors.password && <span>This field is required</span>}

					<input type="submit" value="Login" />
				</FormContainer>
				<Info>
					<Link to="/auth/forget-password">
						<p>Forgot Password</p>
					</Link>
					<Link to="/register">
						<p>Signup</p>
					</Link>
				</Info>
			</div>
			<button onClick={handleClick}>refresh</button>
		</ContainerExtended>
	);
};

export default Login;

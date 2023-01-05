import styled, { keyframes } from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputs } from "../../types/auth";
import { Title } from "../../styles/CommonStyles";
import { useAppDispatch } from "../../app/hooks";
import { fetchUser } from "../../features/auth/authSlice";
import { useState } from "react";

//TODO: Need to implement forget password functionality

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
		font-weight: 500;
		:hover {
			background-color: ${theme.col.black};
			color: ${theme.col.white};
		}
		&:disabled {
			background-color: ${theme.col["gray-3"]};
		}
	}
`;

const buttonLoadingSpinner = keyframes`
	from {
		transform: rotate(0turn);
	}
	to {
		transform: rotate(1turn);
	}
`;

const ButtonSpinner = styled.div`
	background-color: ${theme.col.lightGray};
	padding: ${theme.spacing["15"]};
	margin: 5px auto;
	width: 300px;
	border: 1px solid ${theme.col.lightGray};
	border-radius: 3px;
	display: flex;
	justify-content: center;
	span {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 4px solid transparent;
		border-top-color: ${theme.col.black};
		border-radius: 50%;
		animation: ${buttonLoadingSpinner} 1s ease infinite;
	}
`;

const Info = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	font-size: ${theme.fs.sm};
`;

const Error = styled.div`
	color: ${theme.col.red};
	font-size: 20px;
	margin: 10px auto;
`;

const Login = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);

	const nagivate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>();
	const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
		setError("");
		setLoading(true);
		const authSuccess = await dispatch(fetchUser(data));
		if (fetchUser.fulfilled.match(authSuccess)) {
			setLoading(false);
			nagivate("/");
		} else {
			setLoading(false);
			if (authSuccess.payload) {
				console.error(authSuccess.payload);
			} else {
				console.error("code", authSuccess.error.message);
				if (
					authSuccess.error.message?.toLocaleLowerCase() ===
					"Request failed with status code 401".toLocaleLowerCase()
				) {
					setError("Could not find any user, please check your credentials");
				} else {
					setError("We are having some issue, please try again later");
				}
			}
		}
	};

	return (
		<ContainerExtended>
			<div>
				<Title>Sign In </Title>

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

					{!loading ? (
						<input value="Login" type="submit" disabled={loading} />
					) : (
						<ButtonSpinner>
							<span></span>
						</ButtonSpinner>
					)}
					{error && <Error>{error}</Error>}
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
		</ContainerExtended>
	);
};

export default Login;

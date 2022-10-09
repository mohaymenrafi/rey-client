import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	username: string;
	password: string;
	roles: string[];
};

const ContainerExtended = styled(Container)`
	padding: 50px;
	display: flex;
	justify-content: center;
	align-content: center;
`;

const Title = styled.h2`
	font-size: ${theme.fs.lg};
	color: ${theme.col.gray};
	margin-bottom: 20px;
	text-align: center;
	@media (min-width: ${theme.sc.md}) {
		margin-bottom: 30px;
		font-size: ${theme.fs.xl};
	}
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

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		data = {
			...data,
			roles: ["customer"],
		};
		console.log(data);
	};

	return (
		<ContainerExtended>
			<div>
				<Title>Login</Title>
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

					<input type="submit" value="Sign In" />
				</FormContainer>
			</div>
		</ContainerExtended>
	);
};

export default Login;

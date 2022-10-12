import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { Title } from "../../styles/CommonStyles";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import { RegsiterInputs } from "../../types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ContainerExtended = styled(Container)`
	padding: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
`;

const FormContainer = styled.form`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-gap: 20px;

	@media (min-width: ${theme.sc.sm}) {
		width: 550px;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: ${theme.sc.md}) {
		margin: auto;
	}
`;

const Input = styled.input`
	padding: ${theme.spacing["15"]};

	border: 1px solid ${theme.col.lightGray};
	border-radius: 3px;
	font-size: ${theme.fs.base};
	width: 100%;
`;

const FormSubmit = styled.input`
	grid-column: 1/-1;
	margin-top: 20px;
	display: block;
	margin-left: auto;
	margin-right: auto;
	cursor: pointer;
	background-color: ${theme.col.lightGray};
	transition: all 0.2s ease;
	padding: 15px 48px;
	border: 1px solid ${theme.col.lightGray};
	border-radius: 3px;
	font-size: ${theme.fs.base};
	:hover {
		background-color: ${theme.col.black};
		color: ${theme.col.white};
	}
`;

const Error = styled.p`
	color: ${theme.col.red};
	font-size: ${theme.fs.sm};
	padding-top: 3px;
`;

const Info = styled.p`
	margin-top: 20px;
	text-align: center;
	span {
		color: ${theme.col.red};
	}
`;

const Regex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const Register = () => {
	const formSchema = Yup.object().shape({
		firstname: Yup.string().trim(),
		lastname: Yup.string().trim(),
		email: Yup.string()
			.required("Email is required")
			.matches(Regex, "Email address is not correct"),
		username: Yup.string()
			.required("Username is required")
			.min(3, "minimun 3 characters required"),
		password: Yup.string()
			.required("Password is required")
			.min(6, "Password length must be at least 6 characters"),
		confirmPassword: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password")], "Passwords does not match"),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegsiterInputs>({
		resolver: yupResolver(formSchema),
	});

	const onSubmit: SubmitHandler<RegsiterInputs> = (data) => {
		if (data.password !== data.confirmPassword) {
		}
		console.log(data);
	};
	return (
		<ContainerExtended>
			<Title>Sign up</Title>
			<FormContainer onSubmit={handleSubmit(onSubmit)}>
				{/* <InputContainer> */}
				<div>
					<Input
						type="text"
						placeholder="First Name"
						{...register("firstname")}
					/>
				</div>

				<div>
					<Input
						type="text"
						placeholder="Last Name"
						{...register("lastname")}
					/>
				</div>

				<div>
					<Input
						type="text"
						placeholder="Username"
						{...register("username", { required: true })}
					/>
					{errors?.username && <Error>{errors?.username?.message}</Error>}
				</div>
				<div>
					<Input
						type="text"
						placeholder="Email Address"
						{...register("email", { required: true, pattern: Regex })}
					/>
					{errors?.email && <Error>{errors?.email?.message}</Error>}
				</div>

				<div>
					<Input
						type="password"
						placeholder="Password"
						{...register("password", { required: true })}
					/>
					{errors?.password && <Error>{errors?.password?.message}</Error>}
				</div>

				<div>
					<Input
						type="password"
						placeholder="Confirm Password"
						{...register("confirmPassword", { required: true })}
					/>
					{errors?.confirmPassword && (
						<Error>{errors?.confirmPassword?.message}</Error>
					)}
				</div>
				{/* </InputContainer> */}
				<FormSubmit type="submit" value="Register" />
			</FormContainer>
			<Info>
				Already have an account?{" "}
				<span>
					<Link to="/login">Sign in</Link>
				</span>
			</Info>
		</ContainerExtended>
	);
};

export default Register;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { Text } from "../../styles/text";
import { theme } from "../../styles/theme";

const ExtendedContainer = styled(Container)`
	display: grid;
	padding: 50px 15px;
	grid-template-columns: repeat(1, 1fr);
	grid-row-gap: 25px;
	@media (min-width: ${theme.sc.md}) {
		grid-template-columns: repeat(2, 1fr);
		grid-row-gap: 0px;
		grid-column-gap: 45px;
	}
`;

const Title = styled.h2`
	font-size: ${theme.fs.lg};
	color: ${theme.col.gray};
	margin-bottom: 20px;
	@media (min-width: ${theme.sc.md}) {
		margin-bottom: 30px;
		font-size: ${theme.fs.xl};
	}
`;

const Form = styled.form``;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	label {
		margin-bottom: 10px;
		font-size: ${theme.fs.base};
		font-weight: 400;
	}
	input,
	textarea {
		font-size: ${theme.fs.base};
		padding: 5px 10px;
		border: 1px solid ${theme.col.lightGray};
		border-radius: 3px;
		&:focus {
			border-color: ${theme.col.gray};
		}
	}
`;

const Submit = styled.button`
	background-color: ${theme.col.darkBlue};
	border: 2px solid ${theme.col.darkBlue};
	padding: 11px 32px;
	margin-top: 15px;
	font-weight: 500;
	color: ${theme.col.white};
	&:hover {
		border-color: ${theme.col.darkBlue};
		color: ${theme.col.darkBlue};
		background-color: ${theme.col.white};
		cursor: pointer;
	}
`;

const SuccessMessage = styled.p`
	display: inline-block;
	margin-top: 10px;
	color: ${theme.col.darkBlue};
	font-size: ${theme.fs.base};
	font-weight: 500;
`;

interface IProps {
	name: string;
	email: string;
	message: string;
}

const Contact: React.FC = () => {
	const [inputs, setInputs] = useState<IProps>({
		name: "",
		email: "",
		message: "",
	});
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setInputs({
			name: "",
			email: "",
			message: "",
		});
		setShowSuccess(true);
		setTimeout(() => {
			setShowSuccess(false);
		}, 2000);
	};
	// useEffect(() => {

	// }, [showSuccess]);

	return (
		<ExtendedContainer>
			<div>
				<Title>Can We Help? </Title>
				<Text>
					Our team was handpicked for their understanding of materials, process
					and passion for fashion. Whether you are browsing our site or visiting
					our store, we are always willing to share our deep knowledge and
					understanding of our makers and their craft.
				</Text>
			</div>
			<div>
				<Title>Contact Ray Furnisher</Title>
				<Form>
					<InputContainer>
						<label htmlFor="name">Your Name </label>
						<input
							type="text"
							name="name"
							value={inputs.name}
							onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor="email">Your Email </label>
						<input
							type="email"
							name="email"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor="message">Your Message</label>
						<textarea
							rows={4}
							name="message"
							value={inputs.message}
							onChange={(e) =>
								setInputs({ ...inputs, message: e.target.value })
							}
						/>
					</InputContainer>
					<Submit type="submit" onClick={(e) => handleSubmit(e)}>
						SEND MESSAGE
					</Submit>
				</Form>
				{showSuccess && (
					<SuccessMessage>We've received your message.</SuccessMessage>
				)}
			</div>
		</ExtendedContainer>
	);
};

export default Contact;

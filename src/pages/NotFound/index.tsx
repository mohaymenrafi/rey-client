import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 70vh;
	div {
		text-align: center;
		h2 {
			font-size: 2rem;
			margin-bottom: 20px;
		}
		button {
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
		}
	}
`;

const NotFound = () => {
	const navigate = useNavigate();
	const handleButtonClick = () => {
		navigate("/");
	};
	return (
		<Container>
			<div>
				<h2>The page you're looking for is not found.</h2>
				<button onClick={handleButtonClick}>Back to home</button>
			</div>
		</Container>
	);
};

export default NotFound;

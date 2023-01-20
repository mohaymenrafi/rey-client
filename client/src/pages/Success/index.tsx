import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";

const TextBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 30px 15px;
	@media (min-width: ${theme.sc.lg}) {
		min-height: calc(100vh - 400px);
	}
	span {
		display: flex;
		align-items: center;
		column-gap: 10px;
		margin-bottom: 30px;
		font-size: ${theme.fs.base};
	}
	p {
		font-size: ${theme.fs["md-2"]};
		text-align: center;
		font-weight: 500;

		a {
			font-weight: 600;
			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

const Success = () => {
	return (
		<Container>
			<TextBox>
				<span>
					<AiFillCheckCircle size={40} color={"green"} />
					<h2>You have successfully placed your!</h2>
				</span>
				<p>
					Please visit <Link to="/my-account">My Account</Link> page to check
					your orders.
				</p>
			</TextBox>
		</Container>
	);
};

export default Success;

import styled from "styled-components";
import { theme } from "./theme";

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

export { Title };

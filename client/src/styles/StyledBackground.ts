import styled from "styled-components";
import { theme } from "./theme";

const StyledBackground = styled.div<{ blue: boolean }>`
	background: linear-gradient(
		90deg,
		${(props) => (props.blue ? theme.col.skyblue : theme.col.white)} 50%,
		${theme.col.white} 50%
	);
`;

export default StyledBackground;

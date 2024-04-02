import { Icon } from "../Header";
import { IconType } from "react-icons/lib";
import styled from "styled-components";
import { theme } from "../../styles/theme";

// pass the icon and the text as children

interface Props {
	IconEl: IconType;
	text: number;
	func: () => void;
}
const IconContainer = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;
const Text = styled.span`
	background-color: ${theme.col["black-2"]};
	font-size: ${theme.fs.xxs};
	border-radius: 150px;
	width: 16px;
	height: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${theme.col.white};
	margin-left: -8px;
	margin-top: -10px;
`;

const IconText: React.FC<Props> = ({ IconEl, text, func }) => {
	return (
		<IconContainer onClick={func}>
			<Icon>
				<IconEl />
			</Icon>
			<Text>{text}</Text>
		</IconContainer>
	);
};

export default IconText;

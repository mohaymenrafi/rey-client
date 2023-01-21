import styled from "styled-components";
import Container from "../../styles/Container";

const ContainerExtended = styled(Container)`
	display: grid;
	grid-template-columns: repeat(1fr, 1fr);
`;
const MyAccount = () => {
	return (
		<ContainerExtended>
			<aside>this is where the menu will be placed.</aside>
			<main>content will go there</main>
		</ContainerExtended>
	);
};

export default MyAccount;

import styled from "styled-components";
import { theme } from "./theme";

const StyledBackground = styled.div`
  background: linear-gradient(
    90deg,
    ${theme.col.skyblue} 50%,
    ${theme.col.white} 50%
  );
`;

export default StyledBackground;

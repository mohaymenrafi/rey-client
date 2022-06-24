import styled from "styled-components";
import { theme } from "./theme";

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 5px 15px;

  @media (min-width: ${theme.sc.sm}) {
    max-width: ${theme.sc.sm};
  }
  @media (min-width: ${theme.sc.md}) {
    max-width: ${theme.sc.md};
  }
  @media (min-width: ${theme.sc.lg}) {
    max-width: ${theme.sc.lg};
  }
  @media (min-width: ${theme.sc.xl}) {
    max-width: ${theme.sc.xl};
  }
  @media (min-width: ${theme.sc["2xl"]}) {
    max-width: ${theme.sc["2xl"]};
  }
`;

export default Container;

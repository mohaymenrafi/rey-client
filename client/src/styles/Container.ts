import styled from "styled-components";
import { theme } from "./theme";

const Container = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 0 2rem;
  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    max-width: ${({ theme }) => theme.screens.sm};
  }
  @media (min-width: ${({ theme }) => theme.screens.md}) {
    max-width: ${({ theme }) => theme.screens.md};
  }
  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    max-width: ${({ theme }) => theme.screens.lg};
  }
  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    max-width: ${({ theme }) => theme.screens.xl};
  }
  @media (min-width: ${({ theme }) => theme.screens["2xl"]}) {
    max-width: ${({ theme }) => theme.screens["2xl"]};
    padding: 3rem 4rem;
  }
`;

export default Container;

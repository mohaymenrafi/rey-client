import React from "react";
import styled from "styled-components";
import Container from "../../../styles/Container";
import Card from "../Card/Card";
import lightImg from "../../../assets/lighting.jpg.webp";
import Storage from "../../../assets/storage.jpg.webp";
import AccChair from "../../../assets/accent-chairs.jpeg";
import Rugs from "../../../assets/rugs.jpg.webp";
import StyledBackground from "../../../styles/StyledBackground";
import { theme } from "../../../styles/theme";

const StyledBackgroundExt = styled(StyledBackground)`
  @media (min-width: ${theme.sc.lg}) {
    background: linear-gradient(
      180deg,
      ${theme.col.skyblue} 50%,
      ${theme.col.white} 50%
    );
  }
`;

const ExtendedContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 25px;
  padding: 0 20px 50px;
  @media (min-width: ${theme.sc.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    padding: 0;
  }
  @media (min-width: ${theme.sc.lg}) {
    grid-template-columns: repeat(4, 1fr);
    padding-top: 50px;
  }
`;

const DisplayCatTwo: React.FC = () => {
  return (
    <StyledBackgroundExt>
      <ExtendedContainer>
        <div>
          <Card text="LIGHTING" image={lightImg} height={400} />
        </div>
        <div>
          <Card text="STORAGE" image={Storage} height={400} />
        </div>
        <div>
          <Card text="ACCENT CHAIRS" image={AccChair} height={400} />
        </div>
        <div>
          <Card text="RUGS" image={Rugs} height={400} />
        </div>
      </ExtendedContainer>
    </StyledBackgroundExt>
  );
};

export default DisplayCatTwo;

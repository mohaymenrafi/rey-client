import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import logo1 from "../../assets/logo1.svg";
import logo2 from "../../assets/logo2.svg";
import logo3 from "../../assets/logo3.svg";
import logo4 from "../../assets/logo4.svg";
import logo5 from "../../assets/logo5.svg";
import logo6 from "../../assets/logo6.svg";
import logo7 from "../../assets/logo7.svg";
import logo8 from "../../assets/logo8.svg";
import logo9 from "../../assets/logo9.svg";
import logo10 from "../../assets/logo10.svg";

const StyledBG = styled.div`
  background-color: ${theme.col.skyblue};
  padding: 30px 0;
`;
const Container = styled.div`
  background-color: ${theme.col.white};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (min-width: ${theme.sc.md}) {
    margin: 0 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    grid-template-columns: repeat(10, 1fr);
  }
`;
const Image = styled.img`
  width: 100%;
`;

const Logos = () => {
  return (
    <StyledBG>
      <Container>
        <Image src={logo1} alt="" />
        <Image src={logo2} alt="" />
        <Image src={logo3} alt="" />
        <Image src={logo4} alt="" />
        <Image src={logo5} alt="" />
        <Image src={logo6} alt="" />
        <Image src={logo7} alt="" />
        <Image src={logo8} alt="" />
        <Image src={logo9} alt="" />
        <Image src={logo10} alt="" />
      </Container>
    </StyledBG>
  );
};

export default Logos;

import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import StyledBackground from "../../styles/StyledBackground";
import { theme } from "../../styles/theme";
import bannerOne from "../../assets/bannerOne.jpeg";
import bannerTwo from "../../assets/bannerTwo.jpeg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const ContainerExtended = styled(Container)`
  display: grid;
  padding: 0;
  grid-template-columns: repeat(1, minmax(320px, 1fr));
  min-height: 380px;

  @media (min-width: ${theme.sc.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 30px;
  }
  @media (min-width: ${theme.sc.lg}) {
    min-height: 700px;
  }
`;

const Left = styled.div`
  display: none;
  background: url("${bannerOne}") no-repeat center center;
  background-size: cover;
  padding: 8%;

  @media (min-width: ${theme.sc.md}) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }
`;

const Right = styled.div`
  background: url("${bannerTwo}") no-repeat center center;
  background-size: cover;
  padding: 8%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`;
const BannerText = styled.span<{ bgColor?: string }>`
  font-size: ${theme.fs["md-3"]};
  font-weight: 800;
  background-color: ${(props) =>
    props.bgColor === "blue" ? theme.col.darkBlue : theme.col["white-2"]};
  color: ${(props) =>
    props.bgColor === "blue" ? theme.col["white-2"] : theme.col.black};
  padding: 0.3em 0.6em;
  display: inline-block;

  @media (min-width: ${theme.sc.lg}) {
    font-size: ${theme.fs.xl};
  }
`;
const BannerTextSM = styled.button<{ bgColor?: string }>`
  display: flex;
  align-items: center;
  padding: 0.5em 1.5em;
  font-size: ${theme.fs.sm};
  font-weight: 600;
  background-color: ${(props) =>
    props.bgColor === "blue" ? theme.col.darkBlue : theme.col["white-2"]};
  border: 0px;
  color: ${(props) =>
    props.bgColor === "blue" ? theme.col["white-2"] : theme.col.black};
  span {
    margin-right: 1em;
  }
  svg {
    font-size: ${theme.fs["md-2"]};
  }
`;

const Banner = () => {
  return (
    <StyledBackground>
      <ContainerExtended>
        <Left>
          <BannerText>TABLES & CHAIRS</BannerText>
          <BannerTextSM>
            <span>DISCOVER</span> <HiOutlineArrowNarrowRight />
          </BannerTextSM>
        </Left>
        <Right>
          <div>
            <BannerText bgColor="blue">UP TO 40% OFF</BannerText>
          </div>
          <div>
            <BannerText bgColor="blue">SELECTED SOFAS</BannerText>
          </div>
          <BannerTextSM bgColor="blue">
            <span>DISCOVER</span> <HiOutlineArrowNarrowRight />
          </BannerTextSM>
        </Right>
      </ContainerExtended>
    </StyledBackground>
  );
};

export default Banner;

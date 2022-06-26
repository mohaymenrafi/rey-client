import React from "react";
import styled from "styled-components";
import StyledBackground from "../../styles/StyledBackground";
import Img from "../../assets/shop-the-look-1536x550.jpg.webp";
import { theme } from "../../styles/theme";

const StyledBackgroundExtended = styled(StyledBackground)`
  padding: 35px 15px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  @media (min-width: ${theme.sc.md}) {
    height: 430px;
  }
`;
const ImageText = styled.div`
  margin-top: 15px;
  @media (min-width: ${theme.sc.md}) {
    margin-top: 0;
    position: absolute;
    left: 40px;
    bottom: 40px;
  }
  h2 {
    color: ${theme.col.white};
    font-size: ${theme.fs["lg-2"]};
    background-color: ${theme.col.darkBlue};
    padding: 20px;
    font-weight: 800;
  }
  div {
    padding: 20px;
    background-color: ${theme.col.white};
    border: 1px solid ${theme.col.lightGray};
    h3 {
      color: ${theme.col.darkBlue};
      font-weight: 800;
      font-size: ${theme.fs["md-2"]};
    }
    p {
      font-size: ${theme.fs.xs};
      margin-top: 3px;
      color: ${theme.col.black};
    }
  }
`;

const HotspotBanner = () => {
  return (
    <StyledBackgroundExtended>
      <ImageContainer>
        <Image src={Img} alt="hotspot images" />
        <ImageText>
          <h2>-35%</h2>
          <div>
            <h3>
              NOON <br /> COLLECTION
            </h3>
            <p>Northern Scandinavian Design</p>
          </div>
        </ImageText>
      </ImageContainer>
    </StyledBackgroundExtended>
  );
};

export default HotspotBanner;

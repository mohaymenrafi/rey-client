import React from "react";
import styled from "styled-components";
import Container from "../../styles/Container";
import { theme } from "../../styles/theme";
import logo from "../../assets/logo.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaMapMarkerAlt,
} from "react-icons/fa";

const StyledBg = styled.div`
  background-color: ${theme.col.skyblue};
  padding: 30px 30px 0 30px;
`;
const ContainerExtended = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: ${theme.sc.sm}) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 25px;
  }
  @media (min-width: ${theme.sc.lg}) {
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 25px;
  }
`;
const Icon = styled.span`
  color: ${theme.col["black-2"]};
  font-size: ${theme.fs.md};
  margin-right: 20px;
`;

const LogoContainer = styled.div``;
const Location = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fs.sm};
  margin: 15px auto;
  span {
    margin-left: 5px;
    font-weight: 500;
  }
`;

const LinksContainer = styled.div`
  margin-top: 20px;
  @media (min-width: ${theme.sc.sm}) {
    margin-top: 0px;
  }
  h2 {
    font-size: ${theme.fs["md-2"]};
    color: #484f56;
    margin-bottom: 1em;
  }
  ul {
    display: flex;
    list-style: none;
    flex-direction: column;
    li {
      margin-bottom: 7px;
      font-size: ${theme.fs.sm};
      font-weight: 500;
    }
  }
`;
const Copyright = styled.div`
  padding: 15px;
  p {
    text-align: center;
    font-size: ${theme.fs.sm};
    font-weight: 400;
  }
`;

const Footer: React.FC = () => {
  return (
    <StyledBg>
      <ContainerExtended>
        <LogoContainer>
          <img src={logo} alt="" />
          <Location>
            <FaMapMarkerAlt />
            <span> 17, Irving PI, New York.</span>
          </Location>
          <div>
            <Icon>
              <FaFacebookF />
            </Icon>
            <Icon>
              <FaInstagram />
            </Icon>
            <Icon>
              <FaPinterestP />
            </Icon>
          </div>
        </LogoContainer>
        <LinksContainer>
          <h2>SHOP</h2>
          <ul>
            <li>Shop</li>
            <li>Custom Work</li>
            <li>Lookbook</li>
            <li>Wihlist</li>
            <li>Cart</li>
          </ul>
        </LinksContainer>
        <LinksContainer>
          <h2>HELP</h2>
          <ul>
            <li>Frquently Asked Questions</li>
            <li>Questions</li>
            <li>Returns & Exchanges</li>
            <li>Terms & Conditions</li>
          </ul>
        </LinksContainer>
        <LinksContainer>
          <h2>THE COMPANY</h2>
          <ul>
            <li>Company</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>My account</li>
          </ul>
        </LinksContainer>
      </ContainerExtended>
      <Container>
        <Copyright>
          <p>&copy; MhAbdullah 2022. </p>
        </Copyright>
      </Container>
    </StyledBg>
  );
};

export default Footer;

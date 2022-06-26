import React from "react";
import styled from "styled-components";
import Container from "../../../styles/Container";
import StyledBackground from "../../../styles/StyledBackground";
import { theme } from "../../../styles/theme";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import Card from "../Card/Card";
import Beds from "../../../assets/beds.jpeg";
import Chair from "../../../assets/chairs.jpeg";

const ExtendedContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 25px;
  padding: 50px 20px;
  @media (min-width: ${theme.sc.md}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    grid-row-gap: 50px;
    padding: 50px 0;
  }
  @media (min-width: ${theme.sc.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NewsletterContainer = styled.div`
  position: relative;
  border: 10px solid ${theme.col.gray};
  border-top: 0px;
  @media (min-width: ${theme.sc.md}) {
    grid-column: 1/-1;
  }
  @media (min-width: ${theme.sc.lg}) {
    grid-column: 1;
    min-height: 435px;
  }

  padding: 70px 30px 30px;
  color: ${theme.col.gray};
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  &::before {
    position: absolute;
    content: "";
    top: 0px;
    right: 0;
    height: 10px;
    width: 100%;
    background: linear-gradient(
      90deg,
      ${theme.col.gray} 0%,
      ${theme.col.gray} 35%,
      transparent 35%,
      transparent 50%,
      ${theme.col.gray} 50%,
      ${theme.col.gray} 100%
    );

    z-index: 10;
  }
  &::after {
    position: absolute;
    content: "";
    top: 0px;
    right: 50%;
    height: 10px;
    width: 50px;
    background-color: ${theme.col.gray};
    z-index: 20;
    transform: rotate(-50deg);
    transform-origin: top right;
  }

  /* content styling  */
  h2 {
    font-size: ${theme.fs["md-2"]};
    font-weight: 500;
    line-height: 1.3;
  }
  p {
    font-size: ${theme.fs.xs};
  }

  form {
    width: 100%;

    div {
      display: flex;
      border-bottom: 2px solid ${theme.col["black-2"]};
      padding-bottom: 5px;
      input {
        width: 100%;
        flex: 1;
        border: 0px;
        background-color: transparent;
        font-size: ${theme.fs.sm};
        font-weight: 600;
        color: ${theme.col.darkBlue};
      }
      button {
        font-size: ${theme.fs.sm};
        font-weight: 600;
        background-color: transparent;
        border: 0px;
      }
    }
  }
`;

const Icon = styled.span`
  color: ${theme.col["black-2"]};
  font-size: ${theme.fs.md};
  margin-right: 20px;
`;

const Middle = styled.div`
  @media (min-width: ${theme.sc.lg}) {
    grid-column: 2 / span 2;
  }
`;

const DisplayCatOne = () => {
  return (
    <StyledBackground>
      <ExtendedContainer>
        <NewsletterContainer>
          <div>
            <h2>
              <b>GET 10% OFF</b>
              <br />
              YOUR FIRST PURCHASE
            </h2>
          </div>
          <form>
            <div>
              <input type="text" placeholder="YOUR EMAIL ADDRESS" />
              <button>JOIN</button>
            </div>
          </form>
          <div>
            <p>
              Subscribe to our newsletter for new products, trends and offers,
              plus your chance to win a $250 gift card!
            </p>
          </div>
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
        </NewsletterContainer>
        <Middle>
          <Card text="BEDS & MATTRESES" image={Beds} height={400} />
        </Middle>
        <div>
          <Card text="CHAIRS" image={Chair} height={400} />
        </div>
      </ExtendedContainer>
    </StyledBackground>
  );
};

export default DisplayCatOne;

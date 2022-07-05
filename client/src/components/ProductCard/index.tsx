import React, { useState } from "react";
import styled from "styled-components";
import ProductImg from "../../assets/30.jpeg";
import { theme } from "../../styles/theme";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CardContainer = styled.div`
  position: relative;
  border-radius: 25px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 3px solid ${theme.col.lightGray};

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px ${theme.col.lightGray};
    border-radius: 25px;
    z-index: -1;
    transform-origin: center center;
    transition: box-shadow 0.2s ease-out;
  }

  &:hover {
    &::before {
      box-shadow: 0px 0px 0px 15px ${theme.col.lightGray};
    }
  }

  img {
    width: 65%;
    align-self: center;
  }

  h2 {
    color: ${theme.col["black-2"]};
    font-size: ${theme.fs.base};
    font-weight: 500;
    margin: 10px 0;
    margin-bottom: 20px;
    cursor: pointer;
  }
  @media (min-width: ${theme.sc.lg}) {
    padding: 50px 30px;
    h2 {
      font-size: ${theme.fs["md"]};
    }
  }
`;
const Category = styled.p`
  color: #c7cace;
  font-size: ${theme.fs.xxs};
  font-weight: 600;
  @media (min-width: ${theme.sc.lg}) {
    font-size: ${theme.fs.xs};
  }
`;
const Price = styled.p<{ isHover: boolean }>`
  color: ${theme.col.gray};
  font-size: ${theme.fs.sm};
  font-weight: 600;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isHover ? 0 : 1)};
  transform: ${(props) =>
    props.isHover ? "translateY(-20px)" : "translateY(0px)"};

  @media (min-width: ${theme.sc.lg}) {
    font-size: ${theme.fs.base};
  }
`;

const ViewDetailsContainer = styled.div``;

const ViewDetails = styled.div<{ isHover: boolean }>`
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.isHover ? 1 : 0)};
  transform: ${(props) =>
    props.isHover ? "translateY(-20px)" : "translateY(0px)"};
  & > *:not(:last-child) {
    margin-right: 20px;
  }
`;

const View = styled.span`
  text-transform: capitalize;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  font-size: ${theme.fs.sm};
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    background-color: ${theme.col.gray};
    left: 0;
    bottom: -2px;
    transform: scaleX(0);
    transform-origin: center left;
    transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;
const Icon = styled.span``;

const ProductCard = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <CardContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={ProductImg} alt="" />
      <Category>LIGHT</Category>
      <h2>Chicago Large Pendant, Green & Brass</h2>
      <Price isHover={isHover}>$129</Price>
      <ViewDetails isHover={isHover}>
        <View>view details</View>
        <Icon>
          <AiOutlineShoppingCart />
        </Icon>
        <Icon>
          <MdFavoriteBorder />
        </Icon>
      </ViewDetails>
    </CardContainer>
  );
};

export default ProductCard;

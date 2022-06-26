import React from "react";
import styled from "styled-components";
import ProductImg from "../../../assets/30.jpeg";
import { theme } from "../../../styles/theme";

const CardContainer = styled.div`
  position: relative;
  border-radius: 25px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px ${theme.col.lightGray};
    border-radius: 25px;
    z-index: 9;
    transform-origin: center center;
    transition: box-shadow 0.2s ease-out;
  }

  &:hover {
    cursor: pointer;
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
  }
`;
const Category = styled.p`
  color: #c7cace;
  font-size: ${theme.fs.xxs};
  font-weight: 600;
`;
const Price = styled.p`
  color: ${theme.col.gray};
  font-size: ${theme.fs.sm};
  font-weight: 600;
`;
const index = () => {
  return (
    <CardContainer>
      <img src={ProductImg} alt="" />
      <Category>LIGHT</Category>
      <h2>Chicago Large Pendant, Green & Brass</h2>
      <Price>$129</Price>
    </CardContainer>
  );
};

export default index;

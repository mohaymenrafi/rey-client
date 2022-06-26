import React from "react";
import styled from "styled-components";
import bed from "../../../assets/beds.jpeg";
import { theme } from "../../../styles/theme";

interface IProps {
  text: string;
  image: string;
  height: number;
}

const CardContainer = styled.div<{ height: number }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height}px;
  overflow: hidden;
  transition: clip-path 0.5s ease;
  clip-path: inset(0px);
  &:hover {
    clip-path: inset(10px);
    img {
      transform: scale(1.05);
    }
  }
`;

const CardTitle = styled.a`
  position: absolute;
  left: 40px;
  bottom: 40px;
  font-size: ${theme.fs.md};
  font-weight: 700;
  color: ${theme.col.gray};
  background: ${theme.col.white};
  padding: 10px 17px;
  cursor: pointer;
  span {
    position: relative;
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
  }
`;

const CardMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1);
  transition: transform 0.5s ease;
`;

const Card: React.FC<IProps> = ({ text, image, height }) => {
  return (
    <CardContainer height={height}>
      <CardMedia src={image} alt="text" />
      <CardTitle>
        <span>{text}</span>
      </CardTitle>
    </CardContainer>
  );
};

export default Card;

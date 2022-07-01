import React, { useState } from "react";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartIcon, Icon, IHeaderProps, Logo } from ".";
import { SmallText } from "../../styles/SmallText";
import { theme } from "../../styles/theme";

const DesktopNav = styled.div`
  display: none;
  padding: 30px 15px;
  @media (min-width: ${theme.sc.lg}) {
    display: grid;
  }
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  ul {
    display: flex;
    list-style: none;
    li {
      margin-right: 15px;
    }
  }
  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    text-transform: uppercase;
    position: relative;
    &::after {
      transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform-origin: center left;
      position: absolute;
      content: "";
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: ${theme.col.black};
      display: block;
      transform: scaleX(0);
    }
    &:hover {
      &::after {
        transform: scaleX(1);
      }
    }
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Desktop: React.FC<IHeaderProps> = ({ logo, menuItem }) => {
  return (
    <DesktopNav>
      <ul>
        {menuItem?.map((item, idx) => (
          <li key={idx}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Logo src={logo} alt="site logo" aria-label="logo" />
      <Right>
        <CartIcon amount={4}>
          <Icon>
            <BsBag />
          </Icon>
        </CartIcon>
        <SmallText>
          <Link to="/my-account">ACCOUNT</Link>
        </SmallText>
      </Right>
    </DesktopNav>
  );
};

export default Desktop;

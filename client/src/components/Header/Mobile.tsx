import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { CartIcon, Icon, IHeaderProps, Logo, Left } from ".";
import styled from "styled-components";
import { theme } from "../../styles/theme";

let amount: number = 3;
const MobileNav = styled.div`
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    justify-content: flex-end;
    li {
      display: flex;
      margin-left: 16px;
    }
  }
  @media (min-width: ${theme.sc.lg}) {
    display: none;
  }
`;

const Mobile: React.FC<IHeaderProps> = ({ logo, menuItem }) => {
  return (
    <MobileNav>
      <Left>
        <Logo src={logo} alt="site logo" aria-label="logo" />
        <Icon>
          <GiHamburgerMenu />
        </Icon>
      </Left>
      <ul>
        <li>
          <Icon>
            <FiSearch />
          </Icon>
        </li>
        <li>
          <CartIcon amount={amount}>
            <BsBag />
          </CartIcon>
        </li>
        <li>
          <Icon>
            <FiUser />
          </Icon>
        </li>
      </ul>
    </MobileNav>
  );
};

export default Mobile;

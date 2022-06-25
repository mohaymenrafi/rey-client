import styled from "styled-components";
import Container from "../../styles/Container";
import logo from "../../assets/logo.svg";
import { theme } from "../../styles/theme";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import StyledBackground from "../../styles/StyledBackground";

export interface IMenuItem {
  name: string;
  url: string;
}

export interface IHeaderProps {
  logo: string;
  menuItem: IMenuItem[];
}

interface ICart {
  amount: number;
}

const menuItem: IMenuItem[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Shop",
    url: "/shop",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

const StyledTopbar = styled.div`
  background-color: ${theme.col.skyblue};
  font-size: ${theme.fs.xs};
  font-weight: 500;
`;

const ContainerExtended = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  ul {
    display: flex;
    li {
      list-style: none;
      margin-left: 16px;
    }
  }
`;
const ContainerTop = styled(ContainerExtended)`
  display: none;
  padding: 5px 15px;
  margin-bottom: 1px;
  @media (min-width: ${theme.sc.lg}) {
    display: flex;
  }
`;

export const Icon = styled.span`
  color: ${theme.col["black-2"]};
  font-size: ${theme.fs["md-2"]};
`;
export const CartIcon = styled(Icon)<ICart>`
  position: relative;
  @media (min-width: ${theme.sc.lg}) {
    margin-right: 35px;
  }
  &::after {
    position: absolute;
    content: "${(props) => props.amount}";
    color: ${theme.col.white};
    top: 0;
    right: -5px;
    background-color: ${theme.col["black-2"]};
    font-size: ${theme.fs.xxs};
    border-radius: 150px;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: ${theme.sc.lg}) {
      right: -20px;
      top: 2px;
      width: 17px;
      height: 17px;
    }
  }
`;
export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 60px;
  margin-right: 15px;
  align-self: center;
  @media (min-width: ${theme.sc.lg}) {
    justify-self: center;
    width: 80px;
  }
`;

export default function Header() {
  return (
    <header>
      {/* topbar */}
      <StyledTopbar>
        <ContainerTop>
          <p>* Free delivery for orders over $100</p>
          <ul>
            <li>CALL 0555 558 669</li>
            <li>COMPANY</li>
            <li>SUPPORT</li>
          </ul>
        </ContainerTop>
      </StyledTopbar>
      {/* navbar */}
      <StyledBackground>
        <Container>
          <Mobile logo={logo} menuItem={menuItem} />
          <Desktop logo={logo} menuItem={menuItem} />
        </Container>
      </StyledBackground>
    </header>
  );
}

import styled from "styled-components";
import Container from "../../styles/Container";
import logo from "../../assets/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiUser } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import { theme } from "../../styles/theme";

let amount: number = 3;

interface ICart {
  amount: number;
}

const StyledTopbar = styled.div`
  background-color: ${theme.col.skyblue};
  font-size: ${theme.fs.xs};
  font-weight: 500;
`;
const ContainerExtended = styled(Container)`
  /* display: none; */

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

const StyledNav = styled.div`
  background: linear-gradient(
    90deg,
    rgba(235, 246, 252, 1) 50%,
    rgba(255, 255, 255, 1) 50%
  );
  padding: 30px 15px;
`;

const Icon = styled.span`
  color: ${theme.col["black-2"]};
  font-size: ${theme.fs["md-2"]};
`;
const CartIcon = styled(Icon)<ICart>`
  position: relative;
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
  }
`;
const Logo = styled.img`
  width: 60px;
  margin-right: 15px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div``;

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
      <StyledNav>
        <ContainerExtended>
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
        </ContainerExtended>
      </StyledNav>
    </header>
  );
}

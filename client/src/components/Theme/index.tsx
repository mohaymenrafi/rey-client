import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Theme: FC<IProps> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;

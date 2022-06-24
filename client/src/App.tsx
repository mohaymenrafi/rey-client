import React from "react";
import { Header, Theme } from "./components";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalstyle";

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Header />
      <Home />
    </Theme>
  );
}

export default App;

import React from "react";
import { Footer, Header, Theme } from "./components";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import GlobalStyle from "./styles/globalstyle";

function App() {
  return (
    <Theme>
      <GlobalStyle />
      <Header />
      {/* <Home /> */}
      <Contact />
      <Footer />
    </Theme>
  );
}

export default App;

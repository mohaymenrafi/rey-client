import { createGlobalStyle } from "styled-components";
import { customFont } from "./font";
import { theme } from "./theme";

export default createGlobalStyle`
    ${customFont}
    *,*::after,*::before{
        font-family: 'proxima nova';
        margin:0;
        padding: 0;
        box-sizing: border-box;
        outline:0;
    }
    a {
        color:${theme.col["black-2"]} ;
        text-decoration: none;
    }
    a:hover {
        color:${theme.col["darkBlue"]} ;
    }
    
`;

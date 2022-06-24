import { createGlobalStyle } from "styled-components";
import { customFont } from "./font";

export default createGlobalStyle`
    ${customFont}
    *,*::after,*::before{
        font-family: 'proxima nova';
        margin:0;
        padding: 0;
        box-sizing: border-box;
    }
`;

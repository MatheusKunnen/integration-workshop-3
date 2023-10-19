import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    :root {
        --color-primary-light: #FFECD8;
        --color-primary-dark: #1C1A27;
    
        --color-secondary-green: #02AC5F;
        --color-secondary-red: #F86386;
        --color-secondary-yellow: #FCA94F;
        --color-secondary-black: #000000;
        --color-secondary-white: #FFFFFF;
    }
  
`;

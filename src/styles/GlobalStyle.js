import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: black;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;

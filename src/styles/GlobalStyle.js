import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: black;
    }

    button {
        cursor: pointer;
    }

    ul {
        list-style: none;
    }
`;

export default GlobalStyle;

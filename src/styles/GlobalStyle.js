import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        min-width: 1024px;
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

    textarea {
        resize: none;
    }

    input {
        accent-color: #000000;
    }
`;

export default GlobalStyle;

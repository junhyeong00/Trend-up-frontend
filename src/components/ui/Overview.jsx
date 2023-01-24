import styled from 'styled-components';

const Overview = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 1em;
    row-gap: 1.5em;
    margin-top: 1em;
    margin-inline: auto;

    li {
        height: 18em;
    }

    button {
        height: 100%;
        background: none;
        border: none;
        text-align: left;
    }

    p {
        margin-block: .5em .4em;
        color: #444444;
    }

    img {
        width: 17em;
        height: 13em;
        object-fit: cover;
        border-radius: 8px;
    }
`;

export default Overview;

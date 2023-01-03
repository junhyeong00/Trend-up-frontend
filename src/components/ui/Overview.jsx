import styled from 'styled-components';

const Overview = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 1em;
    row-gap: 1.5em;
    margin-bottom: 2em;
    margin-inline: 18vw;
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
        margin-block: .1em .4em;
    }
    img {
        width: 16em;
        height: 16em;
        object-fit: cover;
        border-radius: 1em;
        margin-bottom: 1em;
    }
`;

export default Overview;

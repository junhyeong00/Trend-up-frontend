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
        min-height: 18em;
    }

    button {
        height: 100%;
        background: none;
        border: none;
        text-align: left;
        display: flex;
        flex-direction: column;

        > div {
            margin-top: auto;
        }
    }

    p {
        margin-block: .5em .4em;
        color: #444444;
    }

    img {
        min-width: 17em;
        min-height: 13em;
        max-width: 22em;
        object-fit: cover;
        margin-block: auto;
        border-radius: 8px;
    }
`;

export default Overview;

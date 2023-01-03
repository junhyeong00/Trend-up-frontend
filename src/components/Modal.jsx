import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 3fr 1fr;
  height: 200px;
  left: calc(50vw - 200px);
  position: absolute;
  text-align: center;
  top: calc(50vh - 100px);
  width: 400px;
`;

const Text = styled.div`
  line-height: 22px;
  padding: 30px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #e0e0e0;
  height: 100%;

  button {
    background-color: initial;
    border-inline: 1px solid #e0e0e0;
    border: 0;
    font-size: 1.1em;
  }

  button:first-child {
   border-right: 1px solid #e0e0e0;
  }
`;

export default function Modal({
  titleMessage, firstButtonName, secondButtonName, firstHandleClick, secondHandleClick,
}) {
  return (
    <Container>
      <Text>
        <h3>{titleMessage}</h3>
      </Text>
      <Buttons>
        <button
          type="button"
          onClick={firstHandleClick}
        >
          {firstButtonName}
        </button>
        <button
          type="button"
          onClick={secondHandleClick}
        >
          {secondButtonName}
        </button>
      </Buttons>
    </Container>
  );
}

import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  border: 1px solid black;
  z-index: 999;

  width: 20%;
  height: 20%;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

export default function Modal({
  titleMessage, firstButtonName, secondButtonName, firstHandleClick, secondHandleClick,
}) {
  return (
    <Container>
      <h3>{titleMessage}</h3>
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
    </Container>
  );
}

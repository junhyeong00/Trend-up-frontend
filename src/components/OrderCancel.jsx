import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding-inline: 15%;
`;

const Message = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 30%;
  font-size: 2em;
`;

export default function OrderCancel() {
  return (
    <Container>
      <Message>결제를 취소하였습니다</Message>
    </Container>
  );
}

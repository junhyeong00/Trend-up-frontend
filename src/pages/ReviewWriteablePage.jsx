import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageNavigation from '../components/MyPageNavigation';
import ReviewWriteable from '../components/ReviewWriteable';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function ReviewWriteablePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <MyPageNavigation />
      <ReviewWriteable
        navigate={navigate}
      />
    </Container>
  );
}

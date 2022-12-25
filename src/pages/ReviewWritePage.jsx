import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyPageNavigation from '../components/MyPageNavigation';
import ReviewWrite from '../components/ReviewWirte';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function ReviewWritePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <MyPageNavigation />
      <ReviewWrite
        navigate={navigate}
      />
    </Container>
  );
}

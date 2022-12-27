import styled from 'styled-components';
import MyPageNavigation from '../components/MyPageNavigation';
import MyReviews from '../components/MyReviews';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function ReviewManagementPage() {
  return (
    <Container>
      <MyPageNavigation />
      <MyReviews />
    </Container>
  );
}

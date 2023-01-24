import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import MyPageNavigation from '../components/MyPageNavigation';
import Profile from '../components/Profile';
import ReviewEdit from '../components/ReviewEdit';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function ReviewEditPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { reviewId } = location.state;

  return (
    <Container>
      <div>
        <Profile />
        <MyPageNavigation />
      </div>
      <ReviewEdit
        navigate={navigate}
        reviewId={reviewId}
      />
    </Container>
  );
}

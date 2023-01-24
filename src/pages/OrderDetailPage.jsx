import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import MyPageNavigation from '../components/MyPageNavigation';
import OrderDetail from '../components/OrderDetail';
import Profile from '../components/Profile';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function OrderDetailPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <Profile />
        <MyPageNavigation />
      </div>
      <OrderDetail
        navigate={navigate}
      />
    </Container>
  );
}

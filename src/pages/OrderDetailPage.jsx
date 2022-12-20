import styled from 'styled-components';
import MyPageNavigation from '../components/MyPageNavigation';
import OrderDetail from '../components/OrderDetail';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1em;
`;

export default function OrderDetailPage() {
  return (
    <Container>
      <MyPageNavigation />
      <OrderDetail />
    </Container>
  );
}

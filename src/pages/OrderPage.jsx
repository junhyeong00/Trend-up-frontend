import { useLocation, useNavigate } from 'react-router-dom';
import Order from '../components/Order';

export default function OrderPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const orderProducts = location.state;

  return (
    <Order
      navigate={navigate}
      orderProducts={orderProducts}
    />
  );
}

import { useNavigate } from 'react-router-dom';
import Order from '../components/Order';

export default function OrderPage() {
  const navigate = useNavigate();

  return (
    <Order
      navigate={navigate}
    />
  );
}

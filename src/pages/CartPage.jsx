import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

export default function CartPage() {
  const navigate = useNavigate();

  return (
    <Cart
      navigate={navigate}
    />
  );
}

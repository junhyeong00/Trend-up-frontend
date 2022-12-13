import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';

export default function ProductPage() {
  const navigate = useNavigate();

  return (
    <Product
      navigate={navigate}
    />
  );
}

import { useLocation, useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import Reviews from '../components/Reviews';

export default function ProductPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const productId = location.pathname.split('/')[2];

  return (
    <div>
      <Product
        navigate={navigate}
        productId={productId}
      />
      <Reviews
        productId={productId}
      />
    </div>
  );
}

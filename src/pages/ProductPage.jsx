import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Product from '../components/Product';
import Reviews from '../components/Reviews';
import Inquiries from '../components/Inquiries';

const Container = styled.div`
`;

const Navigation = styled.div`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  margin: 1em auto;
  padding-block: 1em .8em;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
  text-align: center;
  z-index: 99;
  background: white;

  a {
  border: 1px solid ${(props) => props.theme.colors.secondary};
  padding: .4em;
  color: ${(props) => props.theme.colors.secondaryText}; 

  &:focus {
    background: #17181B;
    color: #FFFFFF;
  }
  }
`;

export default function ProductPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const productId = location.pathname.split('/')[2];

  return (
    <Container>
      <Product
        navigate={navigate}
        productId={productId}
      />
      <Navigation>
        <a href="#">상품 상세</a>
        <a href="#reviews">리뷰</a>
        <a href="#inquiries">문의</a>
      </Navigation>
      <Reviews
        productId={productId}
      />
      <Inquiries
        productId={productId}
      />
    </Container>
  );
}

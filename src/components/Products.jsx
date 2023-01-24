import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import numberFormat from '../utils/NumberFormat';

import PageNumbers from './PageNumbers';

import useProductsStore from '../hooks/useProductsStore';
import Overview from './ui/Overview';
import useCategoriesStore from '../hooks/useCategoriesStore';

const Container = styled.div`
  padding: 1em;
  min-width: 1024px;
`;

const Category = styled.div`
  color: #808080;
`;

const Keyword = styled.div`
  color: #808080;
`;

const Empty = styled.p`
  padding-top: 1em;
`;

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsStore = useProductsStore();
  const categoriesStore = useCategoriesStore();

  const { products, totalPageCount } = productsStore;

  const { currentPage } = productsStore;

  const categoryId = location.search.split('=')[1];
  const keyword = location.search.split('=')[2];

  useEffect(() => {
    productsStore.fetchProducts(currentPage);
  }, []);

  const handlePageClick = (page) => {
    productsStore.changePage(page);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      {keyword ? (
        <Keyword>
          <p>
            '
            {decodeURI(keyword)}
            '에 대한 검색 결과 입니다
          </p>
        </Keyword>
      ) : null}
      {categoryId && categoriesStore.categories.length && !keyword ? (
        <Category>
          <p>{categoriesStore.getCategory(Number(categoryId))}</p>
        </Category>
      ) : null}
      {products.length ? (
        <>
          <Overview>
            {products.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  <div>
                    <StarRatings
                      rating={product.totalRating}
                      starRatedColor="#ffc501"
                      starEmptyColor="#ffe899"
                      starDimension="1.3em"
                      starSpacing="2px"
                    />
                    <span>
                      {' '}
                      (
                      {product.totalReviewCount}
                      )
                    </span>
                  </div>
                  <p>
                    <strong>{numberFormat(product.price)}</strong>
                    원
                  </p>
                </button>
              </li>
            ))}
          </Overview>
          <PageNumbers
            totalPageCount={totalPageCount}
            handlePageClick={handlePageClick}
          />
        </>
      ) : <Empty>상품이 존재하지 않습니다</Empty>}
    </Container>
  );
}

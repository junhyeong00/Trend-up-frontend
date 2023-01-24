import { useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useEffect } from 'react';
import useProductsStore from '../hooks/useProductsStore';
import useCategoriesStore from '../hooks/useCategoriesStore';

const Container = styled.nav`
  ul {
    display: flex;
    justify-content: flex-start;
  }

  li {
    margin: 0;
  }
`;

const Button = styled.button`
  border: 0;
  background: none;
  margin-left: .5em;
  font-size: 1em;
  font-weight: 500;
  color: ${({ isActive }) => (isActive ? '#303030' : '#808080')};
`;

export default function Category() {
  const navigate = useNavigate();
  const location = useLocation();
  const productsStore = useProductsStore();
  const categoriesStore = useCategoriesStore();

  const { categories } = categoriesStore;

  useEffect(() => {
    categoriesStore.fetchCategories();
  }, []);

  const handleClickCategory = (id) => {
    productsStore.changeCategoryId(id);
    productsStore.fetchProducts(1);
    navigate(`/products?categoryId=${id}`);
  };

  function isActive(categoryId) {
    return Number(location.search.split('=')[1]) === categoryId;
  }

  return (
    <Container>
      <ul>
        <li>
          <Button
            type="button"
            isActive={isActive(0)}
            onClick={() => handleClickCategory(0)}
          >
            전체
          </Button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Button
              type="button"
              isActive={isActive(category.id)}
              onClick={() => handleClickCategory(category.id)}
            >
              {category.name}
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

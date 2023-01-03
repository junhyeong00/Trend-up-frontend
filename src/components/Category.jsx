import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { useEffect } from 'react';
import useProductsStore from '../hooks/useProductsStore';
import useCategoriesStore from '../hooks/useCategoriesStore';

const Container = styled.nav`
  padding: .8em 1em;
  border-bottom: 1px solid rgb(217,217,217);

  ul {
    display: flex;
  }

  li {
    margin-left: 2em;
  }

  button {
    border: 0;
    background: none;
    font-size: 1.1em;
    /* font-weight: bold; */
  }
`;

export default function Category() {
  const navigate = useNavigate();
  const productsStore = useProductsStore();
  const categoriesStore = useCategoriesStore();

  const { categories } = categoriesStore;

  useEffect(() => {
    categoriesStore.fetchCategories();
  }, []);

  const handleClickCategory = (id) => {
    productsStore.changeCategoryId(id);
    productsStore.fetchProducts(1);
    navigate('/products');
  };

  return (
    <Container>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => handleClickCategory(0)}
          >
            전체
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => handleClickCategory(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

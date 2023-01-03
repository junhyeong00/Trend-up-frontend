import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import useProductsStore from '../hooks/useProductsStore';

import useUserStore from '../hooks/useUserStore';

const Container = styled.nav`
  width: 100%;
  padding: 1em 1.5em;
  border-bottom: 1px solid rgb(217,217,217);

  ul {
    display: flex;
    align-items: center;
    justify-content: end;

    button {
      border: none;
      background: none;
    }
  }

  li {
    margin-inline: 2em;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  button {
    padding: .6em .8em;
  }
`;

const Search = styled.div`
  display: flex;

  input {
    margin-bottom: .6em;
    padding: 1em 1.5em;
    width: 80%;
    :focus {
      outline: 1px solid #99CCFF;
    }
}
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');

  const navigate = useNavigate();

  const userStore = useUserStore();
  const productsStore = useProductsStore();

  const { keyword } = productsStore;

  const handleLogout = () => {
    setAccessToken('');
    setCart('{"items":[]}');
    navigate('/');
  };

  const handClickSearch = () => {
    productsStore.fetchProducts(1);
    navigate('/products');
  };

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  const { name } = userStore;

  if (accessToken && !name) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <Container>
      <ul>
        {accessToken ? (
          <>
            <li>
              <p>
                {name}
                님
              </p>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>로그아웃</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </>
        )}
      </ul>
      <Menu>
        <h1>
          <Link to="/">Trendup</Link>
        </h1>
        <Search>
          <label
            htmlFor="input-keyword"
          >
            search
          </label>
          <input
            id="input-keyword"
            value={keyword}
            onChange={(e) => productsStore.changeKeyword(e.target.value)}
          />
          <button
            type="button"
            onClick={handClickSearch}
          >
            검색
          </button>
        </Search>
        <div>
          <Link to="/cart">장바구니</Link>
          <Link to="/my">My</Link>
        </div>
      </Menu>
    </Container>
  );
}

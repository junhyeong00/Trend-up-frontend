import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import useProductsStore from '../hooks/useProductsStore';

import useUserStore from '../hooks/useUserStore';

import Category from './Category';

import logo from '../images/TRENDUP.png';
import search from '../images/search.png';
import cart from '../images/cart.png';
import my from '../images/my.png';

const Container = styled.nav`
  min-width: 1200px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #D9D9D9;

  div > ul button{
    color: #808080;
  } 

  button {
    border: none;
    background: none;
  }
 
  li {
    margin-inline: 1em;
  }

  label {
    display: none;
  }
`;

const Wrapper = styled.div`
  min-width: 1024px;
  width: 65%;
  margin: 0 auto;
  padding-block: .6em;

  > ul {
    display: flex;
    align-items: center;
    justify-content: end;

    a {
      color: #808080;
      font-size: .9em;
    }

    img {
      width: 1.5em;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button {
    padding: .4em .8em;
  }
`;

const Search = styled.div`
  display: flex;

  border: 1px solid #000000;
  border-radius: 8px;
  background: #FFFFFF;

  input {
    background: none;
    border: none;
    margin-block: .1em;
    padding: .3em 1.3em;
    width: 80%;
    :focus {
      outline: none;
    }
}
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  margin-block: .2em .6em;

  img {
    width: 13.5em;
  }
`;

const Cart = styled.button`
  font-size: 1em;
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
    navigate(`/products?categoryId=&keyword=${keyword}`);
  };

  const handleClickHome = () => {
    productsStore.reset();
    navigate('/');
  };

  const handleClickCart = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }
    navigate('/cart');
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
      <Wrapper>
        <ul>
          {accessToken ? (
            <>
              <li>
                <button type="button" onClick={handleLogout}>로그아웃</button>
              </li>
              <li>
                <Cart type="button" onClick={handleClickCart}>
                  <img src={cart} alt="장바구니" />
                </Cart>
              </li>
              <li>
                <Link to="/my">
                  <img src={my} alt="마이페이지" />
                </Link>
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
              <li>
                <Cart type="button" onClick={handleClickCart}>
                  <img src={cart} alt="장바구니" />
                </Cart>
              </li>
              <li>
                <Link to="/login">
                  <img src={my} alt="마이페이지" />
                </Link>
              </li>
            </>
          )}
        </ul>
        <div>
          <H1>
            <button
              type="button"
              onClick={handleClickHome}
            >
              <img src={logo} alt="trendup" />
            </button>
          </H1>
        </div>
        <Menu>
          <Category />
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
              <img src={search} alt="검색" />
            </button>
          </Search>
        </Menu>
      </Wrapper>
    </Container>
  );
}

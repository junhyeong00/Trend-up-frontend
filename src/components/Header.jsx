import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

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
    padding: .8em 1em;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <ul>
        {accessToken ? (
          <>
            <li>
              <p>
                {userStore.name}
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
          <Link to="/">쇼핑몰</Link>
        </h1>
        <div>
          <input />
          <button type="button">검색</button>
        </div>
        <div>
          <button type="button">
            장바구니
          </button>
          <button type="button">
            My
          </button>
        </div>
      </Menu>
    </Container>
  );
}

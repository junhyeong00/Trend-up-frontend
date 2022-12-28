import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
`;

const Profile = styled.div`
  padding: 1em;
  border: 1px solid black;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  border: 1px solid black;

  li {
    margin-block: .3em;
  }
`;

const Navigation = styled.div`
  width: 10em;
  margin-top: .5em;
`;

export default function MyPageNavigation() {
  const userStore = useUserStore();

  const { name, userName } = userStore;

  return (
    <Container>
      <h2>마이페이지</h2>
      <Navigation>
        <Profile>
          <p>
            {name}
            님
          </p>
          <p>{userName}</p>
        </Profile>
        <Menu>
          <h3>메뉴</h3>
          <ul>
            <li>
              <Link to="/my">주문 목록</Link>
            </li>
            <li>개인 정보 관리</li>
            <li>
              <Link to="/my/review/writeable">리뷰 관리</Link>
            </li>
            <li>찜 리스트</li>
          </ul>
        </Menu>
      </Navigation>
    </Container>
  );
}

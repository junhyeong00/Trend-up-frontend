import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  
`;

const Profile = styled.div`
    border: 1px solid black;
`;

const Menu = styled.div`
    border: 1px solid black;
`;

const Navigation = styled.nav`
  width: 10em;
`;

export default function MyPageNavigation() {
  return (
    <Container>
      <h2>마이페이지</h2>
      <Navigation>
        <Profile>
          <p>
            배준형님
          </p>
          <p>test123</p>
        </Profile>
        <Menu>
          <h3>메뉴</h3>
          <ul>
            <li>
              <Link to="/my">주문 목록</Link>
            </li>
            <li>개인 정보 관리</li>
            <li>리뷰 관리</li>
            <li>찜 리스트</li>
          </ul>
        </Menu>
      </Navigation>
    </Container>
  );
}

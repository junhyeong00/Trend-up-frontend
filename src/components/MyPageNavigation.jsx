import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  /* padding: 1em; */

  h3 {
    border-bottom: 1px solid #D9D9D9;
    padding-block: .9em;
  }

  li {
    margin-block: 1.3em;
    font-weight: 500;
  }
`;

const Navigation = styled.div`
  width: 12em;
  margin-top: .5em;
`;

export default function MyPageNavigation() {
  return (
    <Container>
      <Navigation>
        <Menu>
          <h3>메뉴</h3>
          <ul>
            <li>
              <Link to="/my">주문 목록</Link>
            </li>
            {/* <li>개인 정보 관리</li> */}
            <li>
              <Link to="/my/review/writeable">리뷰 관리</Link>
            </li>
            {/* <li>문의 관리</li> */}
          </ul>
        </Menu>
      </Navigation>
    </Container>
  );
}

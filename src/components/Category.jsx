import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  padding: .8em 1em;
  border-bottom: 1px solid rgb(217,217,217);

  ul {
    display: flex;
  }

  li {
    margin-left: 2em;
  }
`;

export default function Category() {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/products">전체</Link>
        </li>
        <li>
          <Link to="/products">남성 패션</Link>
        </li>
        <li>
          <Link to="/products">화장품/미용</Link>
        </li>
      </ul>
    </Container>
  );
}

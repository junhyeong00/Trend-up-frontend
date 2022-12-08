import { Link } from 'react-router-dom';

export default function Category() {
  return (
    <nav>
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
    </nav>
  );
}

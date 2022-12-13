import { render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

describe('Header', () => {
  it('render screen', () => {
    render(<Header />);

    screen.getByText('로그인');
    screen.getByText('회원가입');
    screen.getByText('장바구니');
    screen.getByText('My');
  });
});

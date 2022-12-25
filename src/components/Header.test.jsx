import {
  cleanup,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
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

const context = describe;

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  context('로그인 하지 않았을 때', () => {
    it('render screen', () => {
      render(<Header />);

      screen.getByText('로그인');
      screen.getByText('회원가입');
      screen.getByText('장바구니');
      screen.getByText('My');
    });
  });

  context('로그인 했을 때', () => {
    it('로그인 정보 확인', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<Header />);

      screen.getByText('장바구니');
      screen.getByText('My');

      await waitFor(() => {
        screen.getByText(/배준형/);
        screen.getByText('로그아웃');
      });
    });

    it('listens for logout event', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      render(<Header />);

      fireEvent.click(screen.getByText('로그아웃'));

      expect(navigate).toBeCalledWith('/');
    });
  });
});

import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('render screen', () => {
    render(<Header />);

    screen.getByText('로그인');
    screen.getByText('회원가입');
    screen.getByText('장바구니');
    screen.getByText('My');
  });
});

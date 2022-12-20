import { render, screen } from '@testing-library/react';
import MyPageNavigation from './MyPageNavigation';

describe('MyPageNavigation', () => {
  it('renders screen', () => {
    render(<MyPageNavigation />);

    screen.getByText('마이페이지');
    screen.getByText('주문 목록');
  });
});

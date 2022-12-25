import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyPageNavigation from './MyPageNavigation';

describe('MyPageNavigation', () => {
  it('renders screen', () => {
    render(
      <MemoryRouter>
        <MyPageNavigation />
      </MemoryRouter>,
    );

    screen.getByText('마이페이지');
    screen.getByText('주문 목록');
  });
});

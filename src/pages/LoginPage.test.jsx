import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

describe('LoginPage', () => {
  it('render screen', async () => {
    render(<LoginPage />);

    screen.getByText('로그인');
  });
});

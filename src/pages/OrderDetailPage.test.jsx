import { render } from '@testing-library/react';

import OrderDetailPage from './OrderDetailPage';

const navigate = jest.fn();

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

describe('OrderDetailPage', () => {
  it('render screen', () => {
    render(<OrderDetailPage />);
  });
});

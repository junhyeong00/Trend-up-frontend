import { render, screen, waitFor } from '@testing-library/react';
import OrderDetail from './OrderDetail';

import OrderStore from '../stores/OrderStore';

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/orders/1',
  }),
}));

describe('OrderDetail', () => {
  it('renders screen', async () => {
    const orderStore = new OrderStore();

    orderStore.fetchOrder(1);

    render(<OrderDetail />);

    await waitFor(() => {
      screen.getByText('주문 상세정보');
      screen.getByText('주문 상품');
    });
  });
});

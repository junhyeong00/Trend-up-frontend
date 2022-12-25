import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import Order from './Order';

const navigate = jest.fn();

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: [
      { name: '가디건' },
    ],
  }),
}));

describe('Order', () => {
  it('renders screen', async () => {
    render(
      <Order
        navigate={navigate}
      />,
    );

    screen.getByText('주문 / 결제');
    screen.getByText('배송지 정보');
    screen.getByText('결제 상세');
    screen.getByText('가디건');
  });

  it('listens for order event', async () => {
    render(
      <Order
        navigate={navigate}
      />,
    );

    fireEvent.change(screen.getByLabelText('받는 분 성함', {
      target: { value: '배준형' },
    }));

    fireEvent.change(screen.getByLabelText('받는 분 번호', {
      target: { value: '01012341234' },
    }));

    fireEvent.change(screen.getByLabelText('도로명주소', {
      target: { value: '인천' },
    }));

    fireEvent.submit(screen.getByText('결제하기'));

    await waitFor(() => {
      expect(navigate).toBeCalledWith('/order/success');
    });
  });
});

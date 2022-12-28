import {
  cleanup,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import Order from './Order';

const navigate = jest.fn();

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

describe('Order', () => {
  afterEach(() => {
    cleanup();
  });

  const orderProducts = [
    { name: '가디건', price: 1000 },
  ];

  it('renders screen', async () => {
    render(
      <Order
        navigate={navigate}
        orderProducts={orderProducts}
      />,
    );

    await waitFor(() => {
      screen.getByText('주문 / 결제');
      screen.getByText('배송지 정보');
      screen.getByText('결제 상세');
      screen.getByText('가디건');
    });
  });

  it('listens for order event', async () => {
    render(
      <Order
        navigate={navigate}
        orderProducts={orderProducts}
      />,
    );

    fireEvent.change(screen.getByLabelText(/받는 분 성함/), {
      target: { value: '배준형' },
    });

    fireEvent.change(screen.getByLabelText('받는 분 번호'), {
      target: { value: '01012341234' },
    });

    fireEvent.change(screen.getByLabelText('도로명주소'), {
      target: { value: '인천' },
    });

    fireEvent.submit(screen.getByText('결제하기'));

    await waitFor(() => {
      expect(navigate).toBeCalled();
    });
  });
});

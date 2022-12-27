import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import ReviewWrite from './ReviewWirte';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    state: {
      orderId: 1,
      product: { productName: '가디건' },
    },
  }),
}));

describe('ReviewWrite', () => {
  it('renders screen', () => {
    render(
      <ReviewWrite
        navigate={navigate}
      />,
    );

    screen.getByText('리뷰 작성');
    screen.getByText('등록하기');
  });

  it('listens for write event', async () => {
    render(
      <ReviewWrite
        navigate={navigate}
      />,
    );

    fireEvent.click(screen.getByText('등록하기'));

    await waitFor(() => {
      expect(navigate).toBeCalled();
    });
  });
});

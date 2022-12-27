import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { reviewsStore } from '../stores/ReviewsStore';

import MyReviews from './MyReviews';

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
}));

describe('MyReviews', () => {
  afterEach(() => {
    cleanup();
  });

  function renderMyReviews() {
    render(
      <MyReviews
        navigate={navigate}
      />,
    );
  }

  it('render screen', async () => {
    renderMyReviews();

    // reviewsStore.fetchReviews(1, 1);

    await waitFor(() => {
      screen.getByText('리뷰 관리');
      screen.getByText('작성한 리뷰');
    });
  });

  it('listens for delete click event', async () => {
    renderMyReviews();

    fireEvent.click(screen.getByText('삭제'));

    await waitFor(() => {
      screen.getByText('취소');
    });
  });
});

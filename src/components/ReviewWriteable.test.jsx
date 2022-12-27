import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { reviewsStore } from '../stores/ReviewsStore';

import ReviewWriteable from './ReviewWriteable';

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

describe('Reviews', () => {
  afterEach(() => {
    cleanup();
  });

  function renderReviewWriteable() {
    render(
      <ReviewWriteable
        navigate={navigate}
      />,
    );
  }

  it('render screen', async () => {
    renderReviewWriteable();

    // reviewsStore.fetchReviews(1, 1);

    await waitFor(() => {
      screen.getByText('리뷰 관리');
      screen.getByText('작성한 리뷰');
    });
  });

  it('listens for review write event', async () => {
    renderReviewWriteable();

    await waitFor(() => {
      // TODO
    });
  });
});

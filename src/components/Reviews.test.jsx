import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import { reviewsStore } from '../stores/ReviewsStore';

import Reviews from './Reviews';

describe('Reviews', () => {
  afterEach(() => {
    cleanup();
  });

  function renderReviews(productId) {
    render(
      <Reviews
        productId={productId}
      />,
    );
  }

  it('render total reviews information', async () => {
    renderReviews(1);

    // reviewsStore.fetchReviews(1, 1);

    await waitFor(() => {
      screen.getByText('상품 리뷰');
      screen.getByText('사용자 총 평점');
      screen.getByText(/4.2/);
    });
  });

  it('render reviews list', async () => {
    renderReviews(1);

    await waitFor(() => {
      screen.getAllByText(/가디건/);
      screen.getByText('좋아요');
    });
  });
});

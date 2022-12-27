import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import ReviewEdit from './ReviewEdit';

const navigate = jest.fn();

describe('ReviewEdit', () => {
  function renderReviewEdit(reviewId) {
    render(
      <ReviewEdit
        navigate={navigate}
        reviewId={reviewId}
      />,
    );
  }

  it('renders screen', async () => {
    renderReviewEdit(1);

    await waitFor(() => {
      screen.getByText('리뷰 수정');
      screen.getByText('수정하기');
    });
  });

  it('listens for edit event', async () => {
    renderReviewEdit(1);

    fireEvent.click(screen.getByText('수정하기'));

    await waitFor(() => {
      expect(navigate).toBeCalled();
    });
  });
});

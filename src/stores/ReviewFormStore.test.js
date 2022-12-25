import ReviewFormStore from './ReviewFormStore';

const context = describe;

describe('ReviewFormStore', () => {
  let reviewFormStore;

  beforeEach(() => {
    reviewFormStore = new ReviewFormStore();
  });

  describe('Review', () => {
    context('when review success', () => {
      it('confirm reviewId', async () => {
        const { reviewId } = await reviewFormStore.reviewWrite({
          orderId: 1,
          orderProduct: { id: 1 },
        });

        expect(reviewId).toBe(1);
      });
    });
  });

  describe('changeRating', () => {
    it('change Rating', async () => {
      reviewFormStore.changeRating(3);

      expect(reviewFormStore.rating).toBe(3);
    });
  });
});

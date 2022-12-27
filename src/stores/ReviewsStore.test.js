import ReviewsStore from './ReviewsStore';

describe('ReviewsStore', () => {
  let reviewsStore;

  beforeEach(() => {
    reviewsStore = new ReviewsStore();
  });

  describe('fetchProductReviews', () => {
    it('상품 전체 리뷰 확인', async () => {
      await reviewsStore.fetchProductReviews(0, 1);

      expect(reviewsStore.reviews.length).toBe(2);
      expect(reviewsStore.reviews[0].id).toBe(1);
    });

    it('상품 전체 리뷰 정보 확인', async () => {
      await reviewsStore.fetchProductReviews(0, 1);

      expect(reviewsStore.totalRating).toBe(4.2);
      expect(reviewsStore.totalReviewCount).toBe(2);
    });
  });

  describe('changePage', () => {
    it('change page', () => {
      expect(reviewsStore.currentPage).toBe(0);

      reviewsStore.changePage(2);

      expect(reviewsStore.currentPage).toBe(1);
    });
  });
});

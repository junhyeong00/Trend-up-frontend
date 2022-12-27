import ReviewStore from './ReviewStore';

describe('ReviewStore', () => {
  let reviewStore;

  beforeEach(() => {
    reviewStore = new ReviewStore();
  });

  describe('fetchReview', () => {
    it('confirm review information', async () => {
      await reviewStore.fetchReview(1);

      expect(reviewStore.rating).toBe(4);
      expect(reviewStore.content).toBe('좋아요');
    });
  });

  describe('changeRating', () => {
    it('change Rating', async () => {
      reviewStore.changeRating(3);

      expect(reviewStore.rating).toBe(3);
    });
  });

  describe('changeContent', () => {
    it('change content', async () => {
      reviewStore.changeContent('싫어요');

      expect(reviewStore.content).toBe('싫어요');
    });
  });
});

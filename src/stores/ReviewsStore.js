import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ReviewsStore extends Store {
  constructor() {
    super();

    this.reviews = [];

    this.totalPageCount = 0;
    this.currentPage = 0;
    this.totalReviewCount = 0;
    this.totalRating = 0;

    this.reviewId = 0;
  }

  async fetchProductReviews(currentPage, productId) {
    const {
      reviews, totalPageCount, totalReviewCount, totalRating,
    } = await apiService.fetchReviews(currentPage, productId);

    this.reviews = reviews;
    this.totalPageCount = totalPageCount;
    this.totalReviewCount = totalReviewCount;
    this.totalRating = totalRating;

    if (!reviews.length) {
      this.totalReviewCount = 0;
      this.totalRating = 0;
    }
    this.publish();
  }

  async fetchMyReviews(currentPage) {
    const { reviews, totalPageCount } = await apiService.fetchMyReviews(currentPage);

    this.reviews = reviews;
    this.totalPageCount = totalPageCount;
    this.publish();
  }

  async delete() {
    const { reviewId } = await apiService.deleteReview(this.reviewId);

    this.reviews = this.reviews.filter((review) => review.id !== reviewId);

    this.publish();

    return reviewId;
  }

  async changePage(page) {
    this.currentPage = page - 1;

    this.publish();
  }

  changeReviewId(reviewId) {
    this.reviewId = reviewId;
    this.publish();
  }
}

export const reviewsStore = new ReviewsStore();

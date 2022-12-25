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
  }

  async fetchReviews(currentPage, productId) {
    const {
      reviews, totalPageCount, totalReviewCount, totalRating,
    } = await apiService
      .fetchReviews(currentPage, productId);

    this.reviews = reviews;
    this.totalPageCount = totalPageCount;
    this.totalReviewCount = totalReviewCount;
    this.totalRating = totalRating;
    this.publish();
  }

  async changePage(page) {
    this.currentPage = page - 1;

    this.publish();
  }
}

export const reviewsStore = new ReviewsStore();

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.review = {};
  }

  async fetchReview(reviewId) {
    const { review } = await apiService.fetchReview(reviewId);

    this.review = review;
    this.publish();
  }
}

export const reviewStore = new ReviewStore();

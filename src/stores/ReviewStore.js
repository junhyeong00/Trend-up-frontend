import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ReviewStore extends Store {
  constructor() {
    super();

    this.review = {};

    this.rating = 5;
    this.content = '';
    this.imageUrl = '';
  }

  async fetchReview(reviewId) {
    const review = await apiService.fetchReview(reviewId);
    this.review = review;
    this.rating = this.review.rating;
    this.content = this.review.content;
    this.imageUrl = this.review.image;
    this.publish();
  }

  async editReview() {
    await apiService.editReview(this.review.id, this.rating, this.content, this.imageUrl);

    this.publish();
  }

  changeRating(rating) {
    this.rating = rating;

    this.publish();
  }

  changeContent(content) {
    this.content = content;

    this.publish();
  }

  async uploadImage(imageFile) {
    const imageUrl = await apiService.upload(imageFile);

    this.imageUrl = imageUrl;
    this.publish();
  }
}

export const reviewStore = new ReviewStore();

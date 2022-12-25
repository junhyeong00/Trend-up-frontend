import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ReviewFormStore extends Store {
  constructor() {
    super();

    this.rating = 5;
    this.content = '';
    this.imageUrl = '';
  }

  initialize() {
    this.rating = 5;
    this.content = '';
    this.imageUrl = '';
  }

  async reviewWrite({ orderId, orderProduct }) {
    const data = await apiService.createReview({
      rating: this.rating,
      content: this.content,
      orderId,
      orderProduct,
      imageUrl: this.imageUrl,
    });

    return data;
  }

  changeRating(rating) {
    this.rating = rating;

    this.publish();
  }

  async uploadImage(imageFile) {
    const imageUrl = await apiService.upload(imageFile);

    this.imageUrl = imageUrl;
    this.publish();
  }
}

export const reviewFormStore = new ReviewFormStore();

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.selectedCount = 1;
    this.totalPrice = 0;
  }

  async fetchProduct(productId) {
    const product = await apiService.fetchProduct(productId);
    this.product = product;
    this.selectedCount = 1;
    this.totalPrice = product.price;
    this.publish();
  }

  increaseCount() {
    this.selectedCount += 1;
    this.totalPrice += this.product.price;
    this.publish();
  }

  decreaseCount() {
    if (this.selectedCount < 2) {
      return;
    }

    this.selectedCount -= 1;
    this.totalPrice -= this.product.price;
    this.publish();
  }
}

export const productStore = new ProductStore();

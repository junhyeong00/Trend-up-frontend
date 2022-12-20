import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.order = {};
  }

  async fetchOrder(orderId) {
    const order = await apiService.fetchOrder(orderId);
    this.order = order;
    this.publish();
  }
}

export const orderStore = new OrderStore();

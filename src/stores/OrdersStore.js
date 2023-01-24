import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrdersStore extends Store {
  constructor() {
    super();

    this.orders = [];

    this.dateRange = [null, null];
    // this.keyword = '';

    this.totalPageCount = 0;
    this.currentPage = 0;

    this.shippedCount = 0;
    this.inTransitCount = 0;
  }

  setDateRange(update) {
    this.dateRange = update;
    this.publish();
  }

  async fetchOrders(currentPage) {
    const {
      orders, totalPageCount, shippedCount, inTransitCount,
    } = await apiService
      .fetchOrders(currentPage, 8, this.dateRange[0], this.dateRange[1], this.keyword);

    this.orders = orders;
    this.totalPageCount = totalPageCount;
    this.shippedCount = shippedCount;
    this.inTransitCount = inTransitCount;
    this.publish();
  }

  async changePage(page) {
    this.currentPage = page - 1;

    await this.fetchOrders(page - 1);
    this.publish();
  }

  // async changeKeyword(keyword) {
  //   this.keyword = keyword;
  //   this.publish();
  // }
}

export const ordersStore = new OrdersStore();

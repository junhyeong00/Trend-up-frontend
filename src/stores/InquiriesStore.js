import { apiService } from '../services/ApiService';

import Store from './Store';

export default class InquiriesStore extends Store {
  constructor() {
    super();

    this.inquiries = [];
    this.totalPageCount = 0;
    this.currentPage = 0;
  }

  async fetchInquiries(currentPage, productId) {
    const { inquiries, totalPageCount } = await apiService
      .fetchInquiries(currentPage, productId);

    this.inquiries = inquiries;
    this.totalPageCount = totalPageCount;

    this.publish();
  }

  async changePage(page) {
    this.currentPage = page - 1;

    this.publish();
  }
}

export const inquiriesStore = new InquiriesStore();

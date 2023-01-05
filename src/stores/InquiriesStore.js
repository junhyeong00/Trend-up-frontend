import { apiService } from '../services/ApiService';

import Store from './Store';

export default class InquiriesStore extends Store {
  constructor() {
    super();

    this.inquiries = [];
    this.totalPageCount = 0;
    this.currentPage = 0;

    this.inquiryId = 0;
  }

  async fetchInquiries(currentPage, productId) {
    const { inquiries, totalPageCount } = await apiService
      .fetchInquiries(currentPage, productId);

    this.inquiries = inquiries;
    this.totalPageCount = totalPageCount;

    this.publish();
  }

  async deleteInquiry() {
    await apiService.deleteInquiry({ inquiryId: this.inquiryId });

    this.inquiries = this.inquiries.filter((inquiry) => inquiry.id !== this.inquiryId);

    this.publish();
  }

  async changePage(page) {
    this.currentPage = page - 1;

    this.publish();
  }

  changeInquiryId(inquiryId) {
    this.inquiryId = inquiryId;
    this.publish();
  }
}

export const inquiriesStore = new InquiriesStore();

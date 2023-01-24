import { apiService } from '../services/ApiService';

import Store from './Store';

export default class InquiriesStore extends Store {
  constructor() {
    super();

    this.inquiries = [];
    this.totalPageCount = 0;
    this.currentPage = 0;

    this.inquiryId = 0;
    this.wroteTitle = '';
    this.wroteContent = '';
    this.wroteSecret = false;
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

  async updateInquiry({ title, content, isSecret }) {
    await apiService.updateInquiry({
      inquiryId: this.inquiryId, title, content, isSecret,
    });

    this.publish();
  }

  async changePage(page) {
    this.currentPage = page - 1;

    this.publish();
  }

  changeInquiryId(inquiryId) {
    this.inquiryId = inquiryId;

    const index = this.inquiries.findIndex((inquiry) => inquiryId === inquiry.id);

    this.wroteTitle = this.inquiries[index].title;
    this.wroteContent = this.inquiries[index].content;
    this.wroteSecret = this.inquiries[index].isSecret;
    this.publish();
  }
}

export const inquiriesStore = new InquiriesStore();

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class InquiryFormStore extends Store {
  async createInquiry({
    productId, title, content, isSecret,
  }) {
    const inquiryId = await apiService.createInquiry({
      productId, title, content, isSecret,
    });

    return inquiryId;
  }
}

export const inquiryFormStore = new InquiryFormStore();

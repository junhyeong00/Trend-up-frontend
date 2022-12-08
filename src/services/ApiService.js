/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async fetchProducts(page) {
    const url = `${baseUrl}/products`;
    const { data } = await axios.get(url, {
      params: { page },
    });

    return {
      products: data.products.content,
      totalPageCount: data.totalPageCount,
    };
  }

  async fetchProduct(productId) {
    const url = `${baseUrl}/products/${productId}`;
    const { data } = await axios.get(url);
    return data;
  }
}

export const apiService = new ApiService();

/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

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

  async fetchOptions(productId) {
    const url = `${baseUrl}/products/${productId}/options`;
    const { data } = await axios.get(url);
    return data;
  }

  async fetchOrders(page, size, startDate, endDate, keyword) {
    const url = `${baseUrl}/orders`;
    const { data } = await axios.get(
      url,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },

        params: {
          page, size, startDate, endDate, keyword,
        },
      },
    );
    return {
      orders: data.orders,
      totalPageCount: data.totalPageCount,
    };
  }

  async postSession({ userName, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userName, password });
    const { accessToken, name } = data;

    return { accessToken, name };
  }

  async order({
    orderProducts, receiver, phoneNumber,
    zipCode, roadAddress, detailAddress,
    payment, totalPrice, deliveryFee, deliveryRequest,
  }) {
    const url = `${baseUrl}/order`;
    const { data } = await axios.post(url, {
      orderProducts,
      receiver,
      phoneNumber,
      zipCode,
      roadAddress,
      detailAddress,
      payment,
      totalPrice,
      deliveryFee,
      deliveryRequest,
    }, { headers: { Authorization: `Bearer ${this.accessToken}` } });

    return data;
  }
}

export const apiService = new ApiService();

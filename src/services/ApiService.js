/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../../config';

const { cloudinaryName, cloudinaryKey } = config;

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

  async fetchOrder(orderId) {
    const url = `${baseUrl}/orders/${orderId}`;
    const { data } = await axios.get(
      url,
      { headers: { Authorization: `Bearer ${this.accessToken}` } },
    );

    return data;
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

    console.log(data);
    return data;
  }

  async fetchUserInformation() {
    const url = `${baseUrl}/user/me`;
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    const { name, userName, phoneNumber } = data;

    return { name, userName, phoneNumber };
  }

  async createReview({
    rating, content, orderId, orderProduct,
  }) {
    const url = `${baseUrl}/review`;
    const { data } = await axios.post(url, {
      rating,
      content,
      orderId,
      ...orderProduct,
    }, { headers: { Authorization: `Bearer ${this.accessToken}` } });

    return data;
  }

  async upload(imageFile) {
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`;

    const formData = new FormData();

    formData.append('api_key', cloudinaryKey);
    formData.append('upload_preset', 'qvnby8qv');
    formData.append('timestamp', (Date.now() / 1000) || 0);
    formData.append('file', imageFile);

    const configOfUpload = {
      header: { 'Content-Type': 'multipart/form-data' },
    };

    const { data } = await axios.post(url, formData, configOfUpload);

    return data.url;
  }

  async fetchReviews(productId, page) {
    const url = `${baseUrl}/products/${productId}/reviews`;
    const { data } = axios.get(url, {
      params: { page },
    });
  }
}

export const apiService = new ApiService();

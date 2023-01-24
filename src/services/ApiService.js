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

  async fetchProducts({ page, categoryId, keyword }) {
    const url = `${baseUrl}/products`;
    const { data } = await axios.get(url, {
      params: { page, categoryId, keyword },
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
      shippedCount: data.shippedCount,
      inTransitCount: data.inTransitCount,
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
    rating, content, orderId, orderProduct, imageUrl,
  }) {
    const url = `${baseUrl}/review`;
    const { data } = await axios.post(url, {
      rating,
      content,
      orderId,
      ...orderProduct,
      imageUrl,
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

  async fetchReviews(page, productId) {
    const url = `${baseUrl}/products/${productId}/reviews`;
    const { data } = await axios.get(url, {
      params: { page },
    });

    return {
      reviews: data.reviews,
      totalPageCount: data.totalPageCount,
      totalReviewCount: data.totalReviewCount,
      totalRating: data.totalRating,
    };
  }

  async fetchMyReviews(page) {
    const url = `${baseUrl}/reviews`;
    const { data } = await axios.get(url, {
      params: { page }, headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return {
      reviews: data.reviews,
      totalPageCount: data.totalPageCount,
    };
  }

  async fetchReview(reviewId) {
    const url = `${baseUrl}/reviews/${reviewId}`;
    const { data } = await axios.get(url);

    return data;
  }

  async deleteReview(reviewId) {
    const url = `${baseUrl}/reviews/${reviewId}`;
    const { data } = await axios.delete(url);

    return data;
  }

  async editReview(reviewId, rating, content, imageUrl) {
    const url = `${baseUrl}/reviews/${reviewId}`;
    await axios.patch(url, {
      rating, content, imageUrl,
    });
  }

  async updateCart(items) {
    const url = `${baseUrl}/user/cart`;
    await axios.patch(url, {
      items,
    }, { headers: { Authorization: `Bearer ${this.accessToken}` } });
  }

  async fetchCart() {
    const url = `${baseUrl}/user/cart`;
    const { data } = await axios.get(
      url,
      { headers: { Authorization: `Bearer ${this.accessToken}` } },
    );

    return data;
  }

  async fetchCategories() {
    const url = `${baseUrl}/categories`;
    const { data } = await axios.get(url);

    return data;
  }

  async createInquiry({
    productId, title, content, isSecret,
  }) {
    const url = `${baseUrl}/inquiry`;
    const { data } = await axios.post(url, {
      productId, title, content, isSecret,
    }, { headers: { Authorization: `Bearer ${this.accessToken}` } });

    return data;
  }

  async fetchInquiries(page, productId) {
    const url = `${baseUrl}/products/${productId}/inquiries`;
    const { data } = await axios.get(url, {
      params: { page }, headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return {
      inquiries: data.inquiries,
      totalPageCount: data.totalPageCount,
    };
  }

  async deleteInquiry({ inquiryId }) {
    const url = `${baseUrl}/inquiries/${inquiryId}`;
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
  }

  async updateInquiry({
    inquiryId, title, content, isSecret,
  }) {
    const url = `${baseUrl}/inquiries/${inquiryId}`;
    await axios.patch(url, {
      title, content, isSecret,
    }, { headers: { Authorization: `Bearer ${this.accessToken}` } });
  }

  async kakaoLogin(code) {
    const url = `${baseUrl}/auth/token`;

    const { data } = await axios.get(url, {
      params: { code },
    });

    return data;
  }

  async createOrder({
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
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async fetchPayResult(pgToken) {
    const url = `${baseUrl}/orders/kakaoPaySuccess`;

    const { data } = await axios.get(url, {
      params: {
        pg_token: pgToken,
      },
    });

    return data;
  }
}

export const apiService = new ApiService();

import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.orderProducts = [];

    // this.phoneNumber = '';
    // this.receiver = '';
    // this.deliveryRequest = '';

    this.deliveryFee = 3000;
    this.totalPrice = 0;
    this.payment = 0;

    this.zipCode = '';
    this.roadAddress = '';
    this.detailAddress = '';

    this.errorMessage = '';
  }

  async order({
    receiver,
    phoneNumber,
    deliveryRequest,
  }) {
    try {
      const data = await apiService.order({
        orderProducts: this.orderProducts,
        receiver,
        phoneNumber,
        zipCode: this.zipCode,
        roadAddress: this.roadAddress,
        detailAddress: this.detailAddress,
        payment: this.payment,
        totalPrice: this.totalPrice,
        deliveryFee: this.deliveryFee,
        deliveryRequest,
      });
      return data;
    } catch (error) {
      this.errorMessage = error.response.data.message;

      this.publish();
      return '';
    }
  }

  initialize() {
    this.zipCode = '';
    this.roadAddress = '';

    this.publish();
  }

  setOrderProducts(orderProducts) {
    this.orderProducts = orderProducts;

    this.totalPrice = this.orderProducts
      .reduce((acc, product) => acc + (product.price + product.optionPrice) * product.quantity, 0);

    this.deliveryFee = this.totalPrice >= 50000 ? 0 : 3000;
    this.payment = this.totalPrice + this.deliveryFee;

    this.publish();
  }

  changeZipCode(zipCode) {
    this.zipCode = zipCode;
    this.publish();
  }

  changeRoadAddress(roadAddress) {
    this.roadAddress = roadAddress;

    this.publish();
  }

  changeDetailAddress(detailAddress) {
    this.detailAddress = detailAddress;

    this.publish();
  }

  // changePhoneNumber(phoneNumber) {
  //   this.phoneNumber = phoneNumber;

  //   this.publish();
  // }

  // changeReceiver(receiver) {
  //   this.receiver = receiver;

  //   this.publish();
  // }

  // changeDeliveryRequest(deliveryRequest) {
  //   this.deliveryRequest = deliveryRequest;

  //   this.publish();
  // }
}

export const orderFormStore = new OrderFormStore();

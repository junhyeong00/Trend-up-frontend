import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.orderProducts = [{
      productId: 1, name: '사과', optionId: 1, optionName: '미니', optionPrice: 500, price: 3000, quantity: 10,
    },
    {
      productId: 2, name: '귤', optionId: 1, optionName: '미니', optionPrice: 300, price: 2000, quantity: 2,
    }];

    // this.phoneNumber = '';
    // this.receiver = '';
    // this.deliveryRequest = '';

    this.deliveryFee = 3000;
    this.totalPrice = this.orderProducts
      .reduce((acc, product) => acc + product.price * product.quantity, 0);
    this.payment = this.totalPrice + this.deliveryFee;

    this.zipCode = '';
    this.roadAddress = '';
    this.detailAddress = '';

    this.errorMessage = '';
  }

  async order({
    receiver,
    phoneNumber,
    deliveryRequest,
    zipCode,
    roadAddress,
    detailAddress,
  }) {
    try {
      const data = await apiService.order({
        orderProducts: this.orderProducts,
        receiver,
        phoneNumber,
        zipCode,
        roadAddress,
        detailAddress,
        payment: this.payment,
        totalPrice: this.totalPrice,
        deliveryFee: this.deliveryFee,
        deliveryRequest,
      });

      return data;
    } catch (error) {
      this.errorMessage = error.response.data.message;
      console.log(this.errorMessage);

      this.publish();
      return '';
    }
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

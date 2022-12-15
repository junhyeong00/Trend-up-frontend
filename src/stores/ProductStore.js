import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.selectedCount = 1;
    this.totalPrice = 0;

    this.options = [];
    this.selectedOptionId = 0;
    this.selectedOptionName = '';
    this.selectedOptionPrice = 0;

    this.errorMessage = '';
  }

  async fetchProduct(productId) {
    const product = await apiService.fetchProduct(productId);
    this.product = product;
    this.selectedCount = 1;
    this.totalPrice = product.price;
    this.selectedOptionId = 0;
    this.errorMessage = '';
    this.publish();
  }

  async fetchOptions(productId) {
    const { options } = await apiService.fetchOptions(productId);
    this.options = options;

    this.publish();
  }

  increaseCount() {
    this.selectedCount += 1;
    this.totalPrice += this.product.price + this.selectedOptionPrice;
    this.publish();
  }

  decreaseCount() {
    if (this.selectedCount < 2) {
      return;
    }

    this.selectedCount -= 1;
    this.totalPrice -= this.product.price + this.selectedOptionPrice;
    this.publish();
  }

  changeOption(optionId) {
    this.selectedOptionId = optionId;

    this.publish();
    if (optionId === 'none') {
      return;
    }
    const option = this.options
      .find((element) => element.id === Number(optionId));

    this.selectedOptionName = option.name;
    this.selectedOptionPrice = option.optionPrice;
    this.totalPrice = (this.product.price + this.selectedOptionPrice) * this.selectedCount;
    this.publish();
  }

  notChoiceOption() {
    this.errorMessage = '옵션을 선택해주세요';
    this.publish();
  }
}

export const productStore = new ProductStore();

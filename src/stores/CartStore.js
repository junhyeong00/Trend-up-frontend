import Cart from '../models/Cart';

import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cart = new Cart([]);
  }

  addItem({
    productId, name, optionId, optionName, price, optionPrice, quantity,
  }) {
    this.cart = this.cart.addItem({
      productId, name, optionId, optionName, price, optionPrice, quantity,
    });

    this.publish();
  }

  deleteItem({
    id,
  }) {
    this.cart = this.cart.deleteItem({
      id,
    });

    this.publish();
  }

  togleSelected({
    id,
  }) {
    this.cart = this.cart.togleSelected({
      id,
    });

    this.publish();
  }

  deleteSelectedItem() {
    const selectedItems = this.cart.items.filter((i) => i.selected);

    selectedItems.forEach((item) => {
      this.cart = this.cart.deleteItem({ id: item.id });
    });

    this.publish();
  }

  deleteOrderProducts(orderProducts) {
    orderProducts.forEach((item) => {
      this.cart = this.cart.deleteItem({ id: item.id });
    });

    this.publish();
  }
}

export const cartStore = new CartStore();

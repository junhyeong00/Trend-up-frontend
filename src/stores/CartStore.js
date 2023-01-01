import Cart from '../models/Cart';
import { apiService } from '../services/ApiService';

import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cart = new Cart([]);
  }

  updateCart() {
    apiService.updateCart(JSON.stringify(this.cart));
  }

  async fetchCart() {
    const { items } = await apiService.fetchCart();
    this.cart = JSON.parse(items);
    this.publish();

    return items;
  }

  setCart(cart) {
    this.cart = new Cart(cart);
    this.publish();
  }

  addItem({
    productId, name, optionId, optionName, price, optionPrice, quantity,
  }) {
    this.cart = this.cart.addItem({
      productId, name, optionId, optionName, price, optionPrice, quantity,
    });

    this.updateCart();
    this.publish();
  }

  deleteItem({
    id,
  }) {
    this.cart = this.cart.deleteItem({
      id,
    });

    this.updateCart();
    this.publish();
  }

  toggleSelected({
    id,
  }) {
    this.cart = this.cart.toggleSelected({
      id,
    });

    this.updateCart();
    this.publish();
  }

  deleteSelectedItem() {
    const selectedItems = this.cart.items.filter((i) => i.selected);

    selectedItems.forEach((item) => {
      this.cart = this.cart.deleteItem({ id: item.id });
    });

    this.updateCart();
    this.publish();
  }

  deleteOrderProducts(orderProducts) {
    orderProducts.forEach((item) => {
      this.cart = this.cart.deleteItem({ id: item.id });
    });

    this.updateCart();
    this.publish();
  }

  isAllSelected() {
    const deselectedItems = this.cart.items.filter((i) => !i.selected);

    return deselectedItems <= 0;
  }

  toggleAllItemSelected() {
    const isAllSelected = this.isAllSelected();

    const itemsToChange = this.cart.items
      .filter((i) => i.selected === isAllSelected);

    itemsToChange.forEach((item) => {
      this.cart = this.cart.toggleSelected({ id: item.id });
    });

    this.updateCart();
    this.publish();
  }
}

export const cartStore = new CartStore();

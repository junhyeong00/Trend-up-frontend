import Item from './Item';

export default class Cart {
  items = [];

  constructor({ items = [] }) {
    this.items = items;
  }

  addItem({
    productId, name, optionId, optionName, price, optionPrice, quantity,
  }) {
    const index = this.items
      .findIndex((i) => i.productId === productId && i.optionId === optionId);

    return index < 0
      ? this.insertItem({
        productId, name, optionId, optionName, price, optionPrice, quantity,
      })
      : this.updateItem({ index, change: quantity });
  }

  insertItem({
    productId, name, optionId, optionName, price, optionPrice, quantity,
  }) {
    const id = Math.max(0, ...this.items.map((i) => i.id)) + 1;
    const item = new Item({
      id, productId, name, optionId, optionName, price, optionPrice, quantity,
    });

    return new Cart({
      items: [...this.items, item],
    });
  }

  updateItem({ index, change }) {
    const item = this.items[index];
    return new Cart({
      items: [
        ...this.items.slice(0, index),
        new Item({ ...item, quantity: item.quantity + change }),
        ...this.items.slice(index + 1),
      ],
    });
  }
}

import Item from './Item';

export default class Cart {
  items = [];

  constructor({ items = [] }) {
    this.items = items;
  }

  addItem({
    productId, name, optionId, optionName,
    price, optionPrice, quantity, image,
  }) {
    const index = this.items
      .findIndex((i) => i.productId === productId && i.optionId === optionId);

    return index < 0
      ? this.insertItem({
        productId,
        name,
        image,
        optionId,
        optionName,
        price,
        optionPrice,
        quantity,
        selected: true,
      })
      : this.updateItem({ index, change: quantity });
  }

  insertItem({
    productId, name, image, optionId, optionName,
    price, optionPrice, quantity, selected,
  }) {
    const id = Math.max(0, ...this.items.map((i) => i.id)) + 1;
    const item = new Item({
      id,
      productId,
      name,
      image,
      optionId,
      optionName,
      price,
      optionPrice,
      quantity,
      selected,
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

  deleteItem({
    id,
  }) {
    const index = this.items.findIndex((i) => i.id === id);

    return new Cart({
      items: [
        ...this.items.slice(0, index),
        ...this.items.slice(index + 1),
      ],
    });
  }

  toggleSelected({
    id,
  }) {
    const index = this.items.findIndex((i) => i.id === id);
    const item = this.items[index];

    return new Cart({
      items: [
        ...this.items.slice(0, index),
        new Item({ ...item, selected: !item.selected }),
        ...this.items.slice(index + 1),
      ],
    });
  }

  decreaseQuantity({
    id,
  }) {
    const index = this.items.findIndex((i) => i.id === id);
    const item = this.items[index];

    if (item.quantity < 2) {
      return new Cart({
        items: [
          ...this.items,
        ],
      });
    }

    return new Cart({
      items: [
        ...this.items.slice(0, index),
        new Item({ ...item, quantity: item.quantity - 1 }),
        ...this.items.slice(index + 1),
      ],
    });
  }

  increaseQuantity({
    id,
  }) {
    const index = this.items.findIndex((i) => i.id === id);
    const item = this.items[index];

    return new Cart({
      items: [
        ...this.items.slice(0, index),
        new Item({ ...item, quantity: item.quantity + 1 }),
        ...this.items.slice(index + 1),
      ],
    });
  }
}

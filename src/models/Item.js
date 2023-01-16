export default class Item {
  constructor({
    id, productId, name, image, optionId, optionName,
    price, optionPrice, quantity, selected,
  }) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.image = image;
    this.optionId = optionId;
    this.optionName = optionName;
    this.price = price;
    this.optionPrice = optionPrice;
    this.quantity = quantity;
    this.selected = selected;
  }
}

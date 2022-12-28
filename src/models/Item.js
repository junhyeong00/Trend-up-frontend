export default class Item {
  constructor({
    id, productId, name, optionId, optionName, price, optionPrice, quantity,
  }) {
    this.id = id;
    this.productId = productId;
    this.name = name;
    this.optionId = optionId;
    this.optionName = optionName;
    this.price = price;
    this.optionPrice = optionPrice;
    this.quantity = quantity;
  }
}

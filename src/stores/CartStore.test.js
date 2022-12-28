import Item from '../models/Item';
import CartStore from './CartStore';

describe('CartStore', () => {
  it('cartStore', () => {
    const cartStore = new CartStore();

    const handleChange = jest.fn();

    cartStore.subscribe(handleChange);

    cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

    expect(handleChange).toBeCalled();

    expect(cartStore.cart).toEqual({
      items: [new Item({
        id: 1, productId: 1, optionId: 1, quantity: 1,
      })],
    });
  });
});

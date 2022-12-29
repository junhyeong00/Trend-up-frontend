import Item from '../models/Item';
import CartStore from './CartStore';

const context = describe;

describe('CartStore', () => {
  let cartStore;

  beforeEach(() => {
    cartStore = new CartStore();
  });

  it('adds an item', () => {
    const handleChange = jest.fn();

    cartStore.subscribe(handleChange);

    cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

    expect(handleChange).toBeCalled();

    expect(cartStore.cart).toEqual({
      items: [new Item({
        id: 1, productId: 1, optionId: 1, quantity: 1, selected: true,
      })],
    });
  });

  it('delete an item', () => {
    const handleChange = jest.fn();

    cartStore.subscribe(handleChange);

    cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

    cartStore.deleteItem({ id: 1 });

    expect(handleChange).toBeCalled();

    expect(cartStore.cart).toEqual({
      items: [],
    });
  });

  it('togle selected', () => {
    const handleChange = jest.fn();

    cartStore.subscribe(handleChange);

    cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

    expect(handleChange).toBeCalled();

    expect(cartStore.cart.items[0].selected).toBeTruthy();

    cartStore.togleSelected({ id: 1 });

    expect(cartStore.cart.items[0].selected).toBeFalsy();
  });

  it('delete selected item', () => {
    const handleChange = jest.fn();

    cartStore.subscribe(handleChange);

    cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

    expect(handleChange).toBeCalled();

    cartStore.deleteSelectedItem();

    expect(cartStore.cart).toEqual({
      items: [],
    });
  });

  context('when orderProducts is one item', () => {
    it('delete orderProducts', () => {
      const orderProducts = [{ id: 1 }];

      const handleChange = jest.fn();

      cartStore.subscribe(handleChange);

      cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

      expect(handleChange).toBeCalled();

      cartStore.deleteOrderProducts(orderProducts);

      expect(cartStore.cart).toEqual({
        items: [],
      });
    });
  });

  context('when orderProducts is two item', () => {
    it('delete orderProducts', () => {
      const orderProducts = [{ id: 1 }, { id: 2 }];

      const handleChange = jest.fn();

      cartStore.subscribe(handleChange);

      cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
      cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

      expect(handleChange).toBeCalled();

      cartStore.deleteOrderProducts(orderProducts);

      expect(cartStore.cart).toEqual({
        items: [],
      });
    });
  });

  context('when orderProducts have not id', () => {
    it('delete orderProducts', () => {
      const orderProducts = [{ productId: 1 }];

      const handleChange = jest.fn();

      cartStore.subscribe(handleChange);

      cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
      cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

      expect(handleChange).toBeCalled();

      cartStore.deleteOrderProducts(orderProducts);

      expect(cartStore.cart.items).toHaveLength(2);
    });
  });
});

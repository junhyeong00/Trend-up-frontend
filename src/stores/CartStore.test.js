import Item from '../models/Item';
import CartStore from './CartStore';

const context = describe;

describe('CartStore', () => {
  let cartStore;

  beforeEach(() => {
    cartStore = new CartStore();
  });

  describe('addItem', () => {
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
  });

  describe('deleteItem', () => {
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
  });

  describe('toggleSelected', () => {
    it('toggle selected', () => {
      const handleChange = jest.fn();

      cartStore.subscribe(handleChange);

      cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

      expect(handleChange).toBeCalled();

      expect(cartStore.cart.items[0].selected).toBeTruthy();

      cartStore.toggleSelected({ id: 1 });

      expect(cartStore.cart.items[0].selected).toBeFalsy();
    });
  });

  describe('deleteSelectedItem', () => {
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
  });

  describe('deleteOrderProducts', () => {
    context('when orderProducts are one item', () => {
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

    context('when orderProducts are two item', () => {
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
  });

  context('when orderProducts have not id', () => {
    it('delete orderProducts', () => {
      const orderProducts = [{ productId: 1 }];

      const handleChange = jest.fn();

      cartStore.subscribe(handleChange);

      cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

      expect(handleChange).toBeCalled();

      cartStore.deleteOrderProducts(orderProducts);

      expect(cartStore.cart.items).toHaveLength(1);
    });
  });

  describe('isAllSelected', () => {
    context('when there is deselected item', () => {
      it('isAllSelected is false', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
        cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

        cartStore.toggleSelected({ id: 1 });

        expect(cartStore.isAllSelected()).toBeFalsy();
      });
    });

    context('when there is not deselected item', () => {
      it('isAllSelected is true', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
        cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

        expect(cartStore.isAllSelected()).toBeTruthy();
      });
    });
  });

  describe('toggleAllItemSelected', () => {
    context('when isAllSelected is true', () => {
      it('isAllSelected change false', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
        cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

        cartStore.toggleAllItemSelected();

        expect(cartStore.isAllSelected()).toBeFalsy();
      });
    });

    context('when isAllSelected is false', () => {
      it('isAllSelected change true', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });
        cartStore.addItem({ productId: 2, optionId: 1, quantity: 1 });

        cartStore.toggleSelected({ id: 1 });

        cartStore.toggleAllItemSelected();

        expect(cartStore.isAllSelected()).toBeTruthy();
      });
    });
  });

  describe('fetchCart', () => {
    it('cart products 확인', async () => {
      await cartStore.fetchCart();

      expect(cartStore.cart).toEqual({
        items: [{
          id: 1, productId: 1, name: '가디건', optionId: '2', optionName: '두툼한 가디건', price: 50000, optionPrice: 1000, quantity: 1, selected: false,
        }],
      });
    });
  });

  describe('decreaseQuantity', () => {
    context('when quantity is 1', () => {
      it('not decrease quantity', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 1 });

        cartStore.decreaseQuantity({ id: 1 });

        expect(cartStore.cart.items[0].quantity).toBe(1);
      });
    });

    context('when quantity is 2', () => {
      it('decrease quantity', () => {
        cartStore.addItem({ productId: 1, optionId: 1, quantity: 2 });

        cartStore.decreaseQuantity({ id: 1 });

        expect(cartStore.cart.items[0].quantity).toBe(1);
      });
    });
  });

  describe('increaseQuantity', () => {
    it('increase quantity', () => {
      cartStore.addItem({ productId: 1, optionId: 1, quantity: 2 });

      cartStore.increaseQuantity({ id: 1 });

      expect(cartStore.cart.items[0].quantity).toBe(3);
    });
  });
});

import ProductsStore from './ProductsStore';

const context = describe;

describe('ProductsStore', () => {
  let productsStore;

  beforeEach(() => {
    productsStore = new ProductsStore();
  });

  context('총 상품이 9개인 상태에서 1페이지를 눌렀을 때', () => {
    it('1페이지 상품 8개 확인', async () => {
      await productsStore.fetchProducts(1);

      expect(productsStore.products[0].name).toBe('상품 1');
      expect(productsStore.products.length).toBe(8);
    });
  });

  context('총 상품이 9개인 상태에서 2페이지를 눌렀을 때', () => {
    it('2페이지 상품 1개 확인', async () => {
      await productsStore.fetchProducts(2);

      expect(productsStore.products[0].name).toBe('상품 9');
      expect(productsStore.products.length).toBe(1);
    });
  });
});

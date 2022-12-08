import ProductStore from './ProductStore';

const context = describe;

describe('ProductStore', () => {
  let productStore;

  beforeEach(() => {
    productStore = new ProductStore();
  });

  describe('fetchProduct', () => {
    it('id 1번 상품 정보 확인', async () => {
      await productStore.fetchProduct(1);

      expect(productStore.product.id).toBe(1);
      expect(productStore.product.name).toBe('상품 1');
      expect(productStore.product.price).toBe(500);

      expect(productStore.totalPrice).toBe(500);
      expect(productStore.selectedCount).toBe(1);
    });
  });

  describe('increaseCount', () => {
    it('총 금액, 상품 개수 증가', async () => {
      await productStore.fetchProduct(1);

      productStore.increaseCount();

      expect(productStore.totalPrice).toBe(1000);
      expect(productStore.selectedCount).toBe(2);
    });
  });

  describe('decreaseCount', () => {
    it('총 금액, 상품 개수 변동 없음', async () => {
      await productStore.fetchProduct(1);

      productStore.decreaseCount();

      expect(productStore.totalPrice).toBe(500);
      expect(productStore.selectedCount).toBe(1);
    });
  });
});

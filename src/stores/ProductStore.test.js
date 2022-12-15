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

  describe('fetchOptions', () => {
    it('상품1의 전체 옵션 확인', async () => {
      await productStore.fetchProduct(1);
      await productStore.fetchOptions(1);

      expect(productStore.options[0].name).toBe('기본');
      expect(productStore.options[0].optionPrice).toBe(0);
      expect(productStore.options[1].name).toBe('두툼한');
      expect(productStore.options[1].optionPrice).toBe(1000);
    });

    context('옵션을 선택하지 않았을 때', () => {
      it('옵션 초기값 확인', async () => {
        await productStore.fetchProduct(1);
        await productStore.fetchOptions(1);

        expect(productStore.selectedOptionId).toBe(0);
        expect(productStore.selectedOptionName).toBe('');
        expect(productStore.selectedOptionPrice).toBe(0);
      });
    });

    context('옵션 1번 (기본)을 선택했을 때', () => {
      it('옵션 1번값 확인', async () => {
        await productStore.fetchProduct(1);
        await productStore.fetchOptions(1);

        productStore.changeOption(1);

        expect(productStore.selectedOptionId).toBe(1);
        expect(productStore.selectedOptionName).toBe('기본');
        expect(productStore.selectedOptionPrice).toBe(0);
      });
    });

    context('옵션 2번 (두툼한)을 선택했을 때', () => {
      it('옵션 2번값 확인', async () => {
        await productStore.fetchProduct(1);
        await productStore.fetchOptions(1);

        productStore.changeOption(2);

        expect(productStore.selectedOptionId).toBe(2);
        expect(productStore.selectedOptionName).toBe('두툼한');
        expect(productStore.selectedOptionPrice).toBe(1000);
      });
    });
  });

  describe('notChoiceOption', () => {
    it('changed errorMessage', async () => {
      await productStore.fetchProduct(1);
      await productStore.fetchOptions(1);

      expect(productStore.errorMessage).toBe('');

      productStore.notChoiceOption();

      expect(productStore.errorMessage).toBe('옵션을 선택해주세요');
    });
  });
});

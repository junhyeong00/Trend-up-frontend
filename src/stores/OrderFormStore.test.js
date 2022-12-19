import OrderFormStore from './OrderFormStore';

const context = describe;

describe('OrderFormStore', () => {
  let orderFormStore;

  beforeEach(() => {
    orderFormStore = new OrderFormStore();
  });

  describe('order', () => {
    context('when receiver is blank', () => {
      it('appear error message', async () => {
        await orderFormStore.order({
          receiver: '',
          phoneNumber: '01012341234',
          deliveryRequest: '',
          zipCode: 123,
          roadAddress: '인천',
          detailAddress: '',
        });

        expect(orderFormStore.errorMessage).toBe('받는 분 성함을 입력해주세요');
      });
    });

    context('when address is blank', () => {
      it('appear error message', async () => {
        await orderFormStore.order({
          receiver: '배준형',
          phoneNumber: '01012341234',
          deliveryRequest: '',
          zipCode: 123,
          roadAddress: '',
          detailAddress: '',
        });

        expect(orderFormStore.errorMessage).toBe('주소를 입력해주세요');
      });
    });

    context('when phoneNumber is blank', () => {
      it('appear error message', async () => {
        await orderFormStore.order({
          receiver: '배준형',
          phoneNumber: '',
          deliveryRequest: '',
          zipCode: 123,
          roadAddress: '주소',
          detailAddress: '',
        });

        expect(orderFormStore.errorMessage).toBe('받는 분 번호를 입력해주세요');
      });
    });

    context('when phoneNumber is blank', () => {
      it('confirm orderId', async () => {
        const { orderId } = await orderFormStore.order({
          receiver: '배준형',
          phoneNumber: '01012341234',
          deliveryRequest: '',
          zipCode: 123,
          roadAddress: '주소',
          detailAddress: '',
        });

        expect(orderId).toBe(1);
      });
    });
  });
});

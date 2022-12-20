import OrderStore from './OrderStore';

describe('OrderStore', () => {
  it('id가 1번인 order 정보 확인', async () => {
    const orderStore = new OrderStore();

    await orderStore.fetchOrder(1);

    expect(orderStore.order.id).toBe(1);
    expect(orderStore.order.payment).toBe(10000);
    expect(orderStore.order.orderProducts[0].productName).toBe('가디건');
  });
});

import OrdersStore from './OrdersStore';

describe('OrdersStore', () => {
  let ordersStore;

  beforeEach(() => {
    ordersStore = new OrdersStore();
  });

  describe('fetchOrders', () => {
    it('전체 주문 목록 확인', async () => {
      await ordersStore.fetchOrders(1);

      expect(ordersStore.orders.length).toBe(3);
      expect(ordersStore.orders[0].id).toBe(1);
    });

    it('12월 14일부터 17일까지의 주문 내역 확인', async () => {
      ordersStore.setDateRange(['2022년 12월 14일', '2022년 12월 17일']);
      await ordersStore.fetchOrders(1);

      expect(ordersStore.orders.length).toBe(2);
      expect(ordersStore.orders[0].id).toBe(1);
      expect(ordersStore.totalPageCount).toBe(2);
    });

    it('12월 16일부터 17일까지의 주문 내역 확인', async () => {
      ordersStore.setDateRange(['2022년 12월 16일', '2022년 12월 17일']);
      await ordersStore.fetchOrders(1);

      expect(ordersStore.orders.length).toBe(1);
      expect(ordersStore.orders[0].id).toBe(2);
      expect(ordersStore.totalPageCount).toBe(2);
    });
  });
});

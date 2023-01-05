import InquiriesStore from './InquiriesStore';

describe('InquiriesStore', () => {
  let inquiriesStore;

  beforeEach(() => {
    inquiriesStore = new InquiriesStore();
  });

  describe('fetchInquiries', () => {
    it('상품 전체 문의 확인', async () => {
      await inquiriesStore.fetchInquiries(0, 1);

      expect(inquiriesStore.inquiries.length).toBe(1);
      expect(inquiriesStore.inquiries[0].id).toBe(1);
      expect(inquiriesStore.inquiries[0].title).toBe('재입고 문의');
    });
  });

  describe('changePage', () => {
    it('change page', () => {
      expect(inquiriesStore.currentPage).toBe(0);

      inquiriesStore.changePage(2);

      expect(inquiriesStore.currentPage).toBe(1);
    });
  });
});

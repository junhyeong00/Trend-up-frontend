import InquiryFormStore from './InquiryFormStore';

describe('InquiryFormStore', () => {
  describe('createInquiry', () => {
    it('생성된 문의의 아이디를 확인', async () => {
      const inquiryFormStore = new InquiryFormStore();

      const { inquiryId } = await inquiryFormStore.createInquiry({
        productId: 1, title: '재입고 문의', content: '재입고 언제 되나요?', isSecret: false,
      });

      expect(inquiryId).toBe(1);
    });
  });
});

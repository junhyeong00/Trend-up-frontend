import { render, screen } from '@testing-library/react';
import Inquiry from './Inquiry';

const context = describe;

describe('Inquiry', () => {
  function renderInquiry(inquiry) {
    render(<Inquiry
      inquiry={inquiry}
    />);
  }

  context('공개 문의글인 경우', () => {
    it('문의글 확인', () => {
      const inquiry = {
        id: 1,
        title: '재입고 문의',
        content: '재입고 언제 되나요?',
        isSecret: false,
      };

      renderInquiry(inquiry);

      screen.getByText('재입고 문의');
    });
  });

  context('비공개 문의글인 경우', () => {
    it('비공개 처리된 문의 확인', () => {
      const inquiry = {
        id: 1,
        title: '비밀글입니다',
        content: '재입고 언제 되나요?',
        isSecret: true,
      };

      renderInquiry(inquiry);

      screen.getByText(/비밀글입니다/);
    });
  });
});

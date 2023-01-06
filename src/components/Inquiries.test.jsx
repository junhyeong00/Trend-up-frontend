import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import Inquiries from './Inquiries';

describe('Inquiries', () => {
  function renderInquiries(productId) {
    render(<Inquiries
      productId={productId}
    />);
  }
  it('renders screen', () => {
    renderInquiries(1);

    screen.getByText('상품 문의');
  });

  it('listens for delete click event', async () => {
    renderInquiries(1);

    fireEvent.click(screen.getByText('미답변'));

    fireEvent.click(screen.getByText('삭제'));

    await waitFor(() => {
      screen.getByText('취소');
      screen.getAllByText('삭제');
    });
  });

  it('listens for edit click event', async () => {
    renderInquiries(1);

    fireEvent.click(screen.getByText('미답변'));

    fireEvent.click(screen.getByText('수정'));

    await waitFor(() => {
      screen.getByText('취소');
      screen.getAllByText('수정');
    });
  });
});

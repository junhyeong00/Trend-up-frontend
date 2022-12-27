import { fireEvent, render, screen } from '@testing-library/react';
import Modal from './Modal';

const firstHandleClick = jest.fn();
const secondHandleClick = jest.fn();

describe('Modal', () => {
  function renderModal() {
    render(<Modal
      titleMessage="정말 삭제하시겠습니까?"
      firstButtonName="취소"
      secondButtonName="삭제"
      firstHandleClick={firstHandleClick}
      secondHandleClick={secondHandleClick}
    />);
  }

  it('renders screen', () => {
    renderModal();

    screen.getByText('정말 삭제하시겠습니까?');
    screen.getByText('취소');
    screen.getByText('삭제');
  });

  it('listens for first event', () => {
    renderModal();

    fireEvent.click(screen.getByText('취소'));

    expect(firstHandleClick).toBeCalled();
  });

  it('listens for second event', () => {
    renderModal();

    fireEvent.click(screen.getByText('삭제'));

    expect(secondHandleClick).toBeCalled();
  });
});

import {
  fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';

import InquiryWrite from './InquiryWrite';

const context = describe;

const onClickRegister = jest.fn();
const onClickCancel = jest.fn();

describe('InquiryWrite', () => {
  function renderInquiryWrite() {
    render(<InquiryWrite
      onClickRegister={onClickRegister}
      onClickCancel={onClickCancel}
    />);
  }

  it('renders screen', () => {
    renderInquiryWrite();

    screen.getByText('제목:');
    screen.getByText('내용:');
  });

  describe('register', () => {
    it('listens for register evnet', () => {
      renderInquiryWrite();

      fireEvent.change(screen.getByLabelText('제목:'), {
        target: { value: '재입고' },
      });

      fireEvent.change(screen.getByLabelText('내용:'), {
        target: { value: '재입고 언제 되나요?' },
      });

      fireEvent.click(screen.getByText('등록'));

      expect(onClickRegister).toBeCalled();
    });

    context('when title is blank', () => {
      it('"제목을 입력해주세요" message 확인', async () => {
        renderInquiryWrite();

        fireEvent.change(screen.getByLabelText('제목:'), {
          target: { value: '' },
        });

        fireEvent.change(screen.getByLabelText('내용:'), {
          target: { value: '재입고 언제 되나요?' },
        });

        fireEvent.click(screen.getByText('등록'));

        await waitFor(() => {
          screen.getByText('제목을 입력해주세요');
        });
      });
    });

    context('when content is blank', () => {
      it('"내용을 입력해주세요" message 확인', async () => {
        renderInquiryWrite();

        fireEvent.change(screen.getByLabelText('제목:'), {
          target: { value: '재입고' },
        });

        fireEvent.change(screen.getByLabelText('내용:'), {
          target: { value: '' },
        });

        fireEvent.click(screen.getByText('등록'));

        await waitFor(() => {
          screen.getByText('내용을 입력해주세요');
        });
      });
    });
  });

  it('listens for cancel evnet', () => {
    renderInquiryWrite();

    fireEvent.click(screen.getByText('취소'));

    expect(onClickCancel).toBeCalled();
  });
});

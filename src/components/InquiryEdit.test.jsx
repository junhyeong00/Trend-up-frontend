import {
  cleanup,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import InquiryEdit from './InquiryEdit';

const onClickEdit = jest.fn();
const onClickEditCancel = jest.fn();

const context = describe;

describe('InquiryEdit', () => {
  afterEach(() => {
    cleanup();
  });

  function renderInquiryEdit() {
    render(<InquiryEdit
      onClickEdit={onClickEdit}
      onClickCancel={onClickEditCancel}
    />);
  }

  describe('edit', () => {
    it('listens for edit evnet', async () => {
      renderInquiryEdit();

      fireEvent.change(screen.getByLabelText('제목:'), {
        target: { value: '재입고' },
      });

      fireEvent.change(screen.getByLabelText('내용:'), {
        target: { value: '재입고 언제 되나요?' },
      });

      fireEvent.click(screen.getByText('수정'));

      await waitFor(() => {
        expect(onClickEdit).toBeCalled();
      });
    });

    context('when title is blank', () => {
      it('"제목을 입력해주세요" message 확인', async () => {
        renderInquiryEdit();

        fireEvent.change(screen.getByLabelText('제목:'), {
          target: { value: '' },
        });

        fireEvent.change(screen.getByLabelText('내용:'), {
          target: { value: '재입고 언제 되나요?' },
        });

        fireEvent.click(screen.getByText('수정'));

        await waitFor(() => {
          screen.getByText('제목을 입력해주세요');
        });
      });
    });

    context('when content is blank', () => {
      it('"내용을 입력해주세요" message 확인', async () => {
        renderInquiryEdit();

        fireEvent.change(screen.getByLabelText('제목:'), {
          target: { value: '재입고' },
        });

        fireEvent.change(screen.getByLabelText('내용:'), {
          target: { value: '' },
        });

        fireEvent.click(screen.getByText('수정'));

        await waitFor(() => {
          screen.getByText('내용을 입력해주세요');
        });
      });
    });
  });

  it('listens for cancel evnet', () => {
    renderInquiryEdit();

    fireEvent.click(screen.getByText('취소'));

    expect(onClickEditCancel).toBeCalled();
  });
});

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import PageNumbers from './PageNumbers';

import useInquiriesStore from '../hooks/useInquiriesStore';
import useInquiryFormStore from '../hooks/useInquiryFormStore';

import InquiryWrite from './InquiryWrite';
import Inquiry from './Inquiry';
import Modal from './Modal';
import InquiryEdit from './InquiryEdit';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    padding: 1em;
    border: 1px solid black;
  }

  button {
    padding: 1em;
  }
`;

const Thead = styled.summary`
  display: grid;
  width: 100%;
  margin-top: 1em;
  padding: 1em;
  grid-template-columns: 10em 5fr 1.3fr 1fr;

  p {
    text-align: center;
    vertical-align: middle;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 999;
`;

export default function Inquiries({ productId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [writeable, setWriteable] = useState(false);

  const inquiriesStore = useInquiriesStore();
  const inquiryFormStore = useInquiryFormStore();

  const {
    inquiries, totalPageCount,
  } = inquiriesStore;

  const { currentPage } = inquiriesStore;

  useEffect(() => {
    inquiriesStore.fetchInquiries(currentPage, productId);
  }, []);

  const handlePageClick = (page) => {
    inquiriesStore.changePage(page);
  };

  const handleClickInquiryWrite = () => {
    setWriteable(!writeable);
  };

  const onClickWriteCancel = () => {
    setWriteable(false);
  };

  const onClickRegister = async ({ title, content, isSecret }) => {
    const inquiryId = await inquiryFormStore.createInquiry({
      productId, title, content, isSecret,
    });

    if (inquiryId) {
      setWriteable(false);
      inquiriesStore.fetchInquiries(currentPage, productId);
    }
  };

  const handleClickDelete = (inquiryId) => {
    setModalOpen(true);
    inquiriesStore.changeInquiryId(inquiryId);
  };

  const handleInquiryDelete = () => {
    inquiriesStore.deleteInquiry();

    setModalOpen(false);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  const handleClickEdit = (inquiryId) => {
    setEditModalOpen(true);
    inquiriesStore.changeInquiryId(inquiryId);
  };

  const onClickEditCancel = () => {
    setEditModalOpen(false);
  };

  const onClickEdit = async ({ title, content, isSecret }) => {
    await inquiriesStore.updateInquiry({
      productId, title, content, isSecret,
    });

    setEditModalOpen(false);
    inquiriesStore.fetchInquiries(currentPage, productId);
  };

  return (
    <Container>
      <h3>상품 문의</h3>
      <div>
        <button
          type="button"
          onClick={handleClickInquiryWrite}
        >
          상품 문의 작성
        </button>
        <button type="button">나의 문의 찾기</button>
      </div>
      {writeable
        ? (
          <InquiryWrite
            onClickRegister={onClickRegister}
            onClickCancel={onClickWriteCancel}
          />
        )
        : null}
      <div>
        <Thead>
          <p>답변 상태</p>
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
        </Thead>
      </div>
      {inquiries.length ? (
        <List>
          {inquiries.map((inquiry) => (
            <Inquiry
              key={inquiry.id}
              inquiry={inquiry}
              handleClickDelete={handleClickDelete}
              handleClickEdit={handleClickEdit}
            />
          ))}
        </List>
      ) : <p>작성된 문의가 없습니다</p>}
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
      {editModalOpen ? (
        <ModalBackground>
          <InquiryEdit
            onClickEdit={onClickEdit}
            onClickCancel={onClickEditCancel}
          />
        </ModalBackground>
      ) : null}
      {modalOpen ? (
        <ModalBackground>
          <Modal
            titleMessage="삭제 시 복구나 재등록이 불가능합니다. 정말 삭제하시겠습니까?"
            firstButtonName="취소"
            firstHandleClick={handleCancelClick}
            secondButtonName="삭제"
            secondHandleClick={handleInquiryDelete}
          />
        </ModalBackground>
      ) : null}
    </Container>
  );
}

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import PageNumbers from './PageNumbers';

import useInquiriesStore from '../hooks/useInquiriesStore';
import useInquiryFormStore from '../hooks/useInquiryFormStore';

import InquiryWrite from './InquiryWrite';
import Inquiry from './Inquiry';

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

  p {
    padding-right: 1em;
  }
`;

const Thead = styled.summary`
  display: grid;
  width: 100%;
  margin-top: 1em;
  padding: 1em;
  grid-template-columns: 1.2fr 5fr 1.3fr 1.3fr;

  p {
    text-align: center;
    vertical-align: middle;
  }
`;

export default function Inquiries({ productId }) {
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

  const onClickCancel = () => {
    setWriteable(false);
  };

  const onClickRegister = async ({ title, content, isSecret }) => {
    const inquiryId = await inquiryFormStore.createInquiry({
      productId, title, content, isSecret,
    });

    if (inquiryId) {
      setWriteable(false);
    }
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
            onClickCancel={onClickCancel}
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
            />
          ))}
        </List>
      ) : <p>작성된 문의가 없습니다</p>}
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}

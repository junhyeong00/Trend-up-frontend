import { useEffect, useState } from 'react';

import styled from 'styled-components';

import PageNumbers from './PageNumbers';

import useReviewsStore from '../hooks/useReviewsStore';
import useInquiryFormStore from '../hooks/useInquiryFormStore';

import InquiryWrite from './InquiryWrite';

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

export default function Inquiries({ productId }) {
  const [writeable, setWriteable] = useState(false);

  const reviewsStore = useReviewsStore();
  const inquiryFormStore = useInquiryFormStore();

  const {
    reviews, totalPageCount,
  } = reviewsStore;

  const { currentPage } = reviewsStore;

  useEffect(() => {
    reviewsStore.fetchProductReviews(currentPage, productId);
  }, []);

  const handlePageClick = (page) => {
    reviewsStore.changePage(page);
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

  if (!reviews.length) {
    return (<p>작성된 문의가 없습니다</p>);
  }

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
      <table>
        <thead>
          <tr>
            <th>답변 상태</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
      </table>

      <List>
        {reviews.map((review) => (
          <li key={review.id}>
            .
          </li>
        ))}
      </List>
      <PageNumbers
        totalPageCount={totalPageCount}
        handlePageClick={handlePageClick}
      />
    </Container>
  );
}

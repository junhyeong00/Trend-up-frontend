import { useEffect, useState } from 'react';

import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import PageNumbers from './PageNumbers';

import useReviewsStore from '../hooks/useReviewsStore';

import Modal from './Modal';

import defaultTheme from '../styles/DefaultTheme';
import SecondaryButton from './ui/SecondaryButton';

const Container = styled.div`
  padding: 1em;
`;

const List = styled.ul`
  li {
    padding: 1em;
    border-bottom: 1px solid #D9D9D9;
    display: grid;
    grid-template-columns: 1.2fr 6fr 1fr;
    align-items: center;
  }

  button {
    padding: 1em;
  }
`;

const Image = styled.img`
  width: 7em;
  height: 7em;
  margin-right: 1em;
  display: flex;
  align-items: center;
  border: 1px solid ${defaultTheme.colors.fourth};
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1.7px solid #000000;
  padding-bottom: 1em;

  a:first-child {
    width: 50%;
    border: 1px solid #CCCCCC;
    padding-block: .4em;
    text-align: center;
    color: #808080;
  }

  a:last-child {
    width: 50%;
    border: 1px solid #17181B;
    background: #17181B;
    padding-block: .4em;
    text-align: center;
    color: #FFFFFF;
  }
`;

const Content = styled.div`
  display: grid;
  gap: .5em;
  color: #727272;
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

const Empty = styled.p`
  padding-block: 1em;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: .6em;
  font-weight: 600;
  color: #000000;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: .9em;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: .9em;
`;

const Common = styled.p`
  text-align: center;
  padding-right: 1em;
`;

export default function MyReviews({ navigate }) {
  const [modalOpen, setModalOpen] = useState(false);

  const reviewsStore = useReviewsStore();

  const {
    reviews, totalPageCount,
  } = reviewsStore;

  const { currentPage } = reviewsStore;

  useEffect(() => {
    reviewsStore.fetchMyReviews(currentPage);
  }, []);

  const handlePageClick = (page) => {
    reviewsStore.changePage(page);
  };

  const handleClickDelete = async (reviewId) => {
    setModalOpen(true);
    await reviewsStore.changeReviewId(reviewId);
  };

  const handleClickEdit = async (reviewId) => {
    navigate('/my/review/edit', {
      state: { reviewId },
    });
  };

  const handleReviewDelete = () => {
    const id = reviewsStore.delete();

    if (id) {
      setModalOpen(false);
    }
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <h3>리뷰 관리</h3>
      <Buttons>
        <Link to="/my/review/writeable">리뷰 작성</Link>
        <Link to="/my/reviews">작성한 리뷰</Link>
      </Buttons>
      {reviews.length
        ? (
          <>
            <List>
              {reviews.map((review) => (
                <li key={review.id}>
                  {review.image ? <Image src={review.image} alt="일반리뷰" />
                    : <Common>일반리뷰</Common>}
                  <Content>
                    <Rating>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#ffc501"
                        starEmptyColor="#ffe899"
                        starDimension="20px"
                        starSpacing="2px"
                      />
                      <p>{review.rating}</p>
                    </Rating>
                    <UserInfo>
                      <p>{review.userName}</p>
                      <p>{review.createAt}</p>
                    </UserInfo>
                    <ProductInfo>
                      <p>{review.productName}</p>
                      <span>
                        -
                        {' '}
                        {review.productOption}
                      </span>
                    </ProductInfo>
                    <pre>{review.content}</pre>
                  </Content>
                  <div>
                    <SecondaryButton
                      type="button"
                      onClick={() => handleClickEdit(review.id)}
                    >
                      수정
                    </SecondaryButton>
                    <SecondaryButton
                      type="button"
                      onClick={() => handleClickDelete(review.id)}
                    >
                      삭제
                    </SecondaryButton>
                  </div>
                </li>
              ))}
            </List>
            <PageNumbers
              totalPageCount={totalPageCount}
              handlePageClick={handlePageClick}
            />
          </>
        )
        : <Empty>작성된 리뷰가 없습니다</Empty>}
      {modalOpen ? (
        <ModalBackground>
          <Modal
            titleMessage="삭제 시 복구나 재등록이 불가능합니다. 정말 삭제하시겠습니까?"
            firstButtonName="취소"
            firstHandleClick={handleCancelClick}
            secondButtonName="삭제"
            secondHandleClick={handleReviewDelete}
          />
        </ModalBackground>
      ) : null}
    </Container>
  );
}

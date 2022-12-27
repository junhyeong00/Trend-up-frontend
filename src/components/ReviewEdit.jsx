import { useEffect } from 'react';
import StarRatings from 'react-star-ratings';

import styled from 'styled-components';

import useReviewStore from '../hooks/useReviewStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;

  h3 {
    margin-bottom: .7em;
  }

  div {
    margin-block: .5em;
  }

  label {
    display: block;
    margin-right: .5em;
  }

  span {
    margin-left: 1em;
  }
`;

const PhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  height: 20em;

  input {
    /* display: none; */
  }

  button {
    margin: 10px 0;
    width: 100px;
    height: 30px;
    border-radius: 10px;
  }
`;

const Box = styled.img`
  background: center url(${(props) => props.url}) no-repeat;
  background-size: contain;
  width: 12em;
  height: 17em;
  /* padding: 10px; */
`;

const Input = styled.input`
  width: 40vw;
  padding: 1em;
`;

export default function ReviewEdit({ navigate, reviewId }) {
  const reviewStore = useReviewStore();

  useEffect(() => {
    reviewStore.fetchReview(reviewId);
  }, []);

  const {
    review, rating, imageUrl, content,
  } = reviewStore;

  const handleClick = () => {
    reviewStore.editReview();

    navigate('/my/reviews');
  };

  const handleImageChange = (e) => {
    reviewStore.uploadImage(e.target.files[0]);
  };

  if (!Object.keys(review).length) {
    return (
      <p>Now loading</p>
    );
  }

  return (
    <Container>
      <div>
        <h3>리뷰 수정</h3>
        <p>
          {review.productName}
          {' '}
          -
          {' '}
          {review.productOption}
        </p>
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          starDimension="40px"
          starSpacing="15px"
          changeRating={(value) => reviewStore.changeRating(value)}
          isSelectable
        />
        <span>
          {rating}
          점
        </span>
        <div>
          <label htmlFor="input-content">내용</label>
          <Input
            id="input-content"
            value={content}
            onChange={(e) => reviewStore.changeContent(e.target.value)}
          />
        </div>
        <PhotoUpload>
          <label htmlFor="input-image">이미지 추가</label>
          {imageUrl ? <Box url={imageUrl} /> : <p>사진을 업로드 해주세요</p>}
          <input
            id="input-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {/* <img src={imageUrl} alt="" /> */}
        </PhotoUpload>
        <button
          type="button"
          onClick={handleClick}
        >
          수정하기
        </button>
      </div>
    </Container>
  );
}

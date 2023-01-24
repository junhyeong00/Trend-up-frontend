import { useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import styled from 'styled-components';

import useReviewFormStore from '../hooks/useReviewFormStore';

import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';
import Textarea from './ui/Textarea';

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
    margin-bottom: .3em;
  }

  span {
    margin-left: 1em;
  }

  textarea {
    width: 100%;
  }
`;

const PhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:.5em;
  height: 15em;

  input {
    display: none;
  }

  button {
    margin: 10px 0;
    width: 100px;
    height: 30px;
    border-radius: 10px;
  }

  label {
    width: 150px;
    height: 30px;
    background: #fff;
    border: 1px solid rgb(77,77,77);
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Box = styled.img`
  background: center url(${(props) => props.url}) no-repeat;
  background-size: contain;
  width: 12em;
  height: 12em;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;

  button {
    border-radius: 4px;
  }
`;

export default function ReviewWrite({ navigate }) {
  const location = useLocation();

  const reviewFormStore = useReviewFormStore();

  const { orderId, product } = location.state;

  const { rating, imageUrl, content } = reviewFormStore;

  const handleClick = async () => {
    const { reviewId } = await reviewFormStore
      .reviewWrite({ orderProduct: product, orderId });

    if (reviewId) {
      navigate('/my');
    }
  };

  const handleImageChange = (e) => {
    reviewFormStore.uploadImage(e.target.files[0]);
  };

  const handleClickCancel = () => {
    navigate(-1);
  };

  return (
    <Container>
      <div>
        <h3>리뷰 작성</h3>
        <p>
          {product.productName}
          {' '}
          -
          {' '}
          {product.productOption}
        </p>
        <StarRatings
          rating={rating}
          starRatedColor="#ffc501"
          starHoverColor="#ffe899"
          starDimension="40px"
          starSpacing="15px"
          changeRating={(value) => reviewFormStore.changeRating(value)}
          isSelectable
        />
        <span>
          {rating}
          점
        </span>
        <div>
          <label htmlFor="input-content">리뷰</label>
          <Textarea
            id="input-content"
            rows="12"
            cols="55"
            maxLength="200"
            placeholder="리뷰를 작성해주세요"
            value={content}
            onChange={(e) => reviewFormStore.changeContent(e.target.value)}
          />
        </div>
        <PhotoUpload>
          {imageUrl ? <Box url={imageUrl} /> : <p>사진을 업로드 해주세요</p>}
          <label htmlFor="input-image">이미지 업로드</label>
          <input
            id="input-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </PhotoUpload>
        <Buttons>
          <SecondaryButton
            type="button"
            onClick={handleClickCancel}
          >
            취소
          </SecondaryButton>
          <PrimaryButton
            type="button"
            onClick={handleClick}
          >
            등록
          </PrimaryButton>
        </Buttons>
      </div>
    </Container>
  );
}

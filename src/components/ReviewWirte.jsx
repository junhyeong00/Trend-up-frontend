import { useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

import styled from 'styled-components';

import useReviewFormStore from '../hooks/useReviewFormStore';

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

export default function ReviewWrite({ navigate }) {
  const location = useLocation();

  const reviewFormStore = useReviewFormStore();

  const { orderId, product } = location.state;

  const { rating, imageUrl } = reviewFormStore;

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
          starRatedColor="blue"
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
          <label htmlFor="input-content">내용</label>
          <Input
            id="input-content"
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
          등록하기
        </button>
      </div>
    </Container>
  );
}

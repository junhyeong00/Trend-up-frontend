/* eslint-disable react/jsx-props-no-spreading */

import { useDaumPostcodePopup } from 'react-daum-postcode';

import styled from 'styled-components';

import useOrderFormStore from '../hooks/useOrderFormStore';
import Error from './ui/Error';

const Container = styled.div`
  
`;

const Label = styled.label`
  display: none;
`;

export default function Postcode({ register, errors }) {
  const open = useDaumPostcodePopup();

  const orderFormStore = useOrderFormStore();

  const handleComplete = (data) => {
    let fulladdress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }

      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }

      fulladdress += extraAddress !== '' ? ` (${extraAddress})` : '';

      orderFormStore.changeZipCode(data.zonecode);
      orderFormStore.changeRoadAddress(data.roadAddress);
    }
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const {
    zipCode, roadAddress, detailAddress,
  } = orderFormStore;

  return (
    <Container>
      <div>
        <Label htmlFor="input-zip-code">우편번호</Label>
        <input
          id="input-zip-code"
          placeholder="우편번호"
          readOnly
          value={zipCode}
          {...register('zipCode')}
        />
        <button type="button" onClick={handleClick}>
          우편번호 찾기
        </button>
      </div>
      <div>
        <Label htmlFor="input-road-address">도로명주소</Label>
        <input
          id="input-road-address"
          placeholder="도로명주소"
          readOnly
          value={roadAddress}
          {...register(
            'roadAddress',
            { required: { value: true, message: '주소를 입력해주세요' } },
          )}
        />
        <Error>{errors.roadAddress ? errors.roadAddress.message : null}</Error>
      </div>
      <div>
        <Label htmlFor="input-detail-address">상세주소</Label>
        <input
          id="input-detail-address"
          placeholder="상세주소"
          // value={detailAddress}
          // onChange={(event) => (
          //   orderFormStore.changeDetailAddress(event.target.value)
          // )}
          {...register('detailAddress')}
        />
      </div>
    </Container>
  );
}

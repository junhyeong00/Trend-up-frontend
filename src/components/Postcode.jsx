/* eslint-disable react/jsx-props-no-spreading */

import { useDaumPostcodePopup } from 'react-daum-postcode';

import styled from 'styled-components';

import useOrderFormStore from '../hooks/useOrderFormStore';
import Error from './ui/Error';
import Input from './ui/Input';

const Search = styled.button`
  background: #E9E9E9;
  margin-left: .6em;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  padding: .7em 1em;
`;

const Label = styled.label`
  display: none;
`;

const Address = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: 100%;
  }

  input {
    width: 98%;
  }
`;

const ZipCode = styled.div`
  input {
    width: 10em;
  }
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
    zipCode, roadAddress, detailAddress, addressErrorMessage,
  } = orderFormStore;

  return (
    <>
      <ZipCode>
        <Label htmlFor="input-zip-code">우편번호</Label>
        <Input
          id="input-zip-code"
          placeholder="우편번호"
          readOnly
          error={addressErrorMessage}
          value={zipCode}
          {...register('zipCode')}
        />
        <Search type="button" onClick={handleClick}>
          우편번호 찾기
        </Search>
      </ZipCode>
      <Address>
        <div>
          <Label htmlFor="input-road-address">도로명주소</Label>
          <Input
            id="input-road-address"
            placeholder="도로명주소"
            readOnly
            error={addressErrorMessage}
            value={roadAddress}
            {...register(
              'roadAddress',
            )}
          />
        </div>
        <div>
          <Label htmlFor="input-detail-address">상세주소</Label>
          <Input
            id="input-detail-address"
            placeholder="상세주소"
            value={detailAddress}
            onChange={(event) => (
              orderFormStore.changeDetailAddress(event.target.value)
            )}
          />
        </div>
      </Address>
      <Error>{addressErrorMessage}</Error>
    </>
  );
}

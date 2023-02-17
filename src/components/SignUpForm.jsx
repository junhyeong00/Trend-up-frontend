/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import styled from 'styled-components';

import useSignUpFormStore from '../hooks/useSignUpFormStore';

import PrimaryButton from './ui/PrimaryButton';
import Error from './ui/Error';
import Input from './ui/Input';

const Container = styled.div`
  display: flex;
  min-width: 1024px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin-top: 1em;
  h2 {
    font-size: 2em;
    font-weight: bold;
  }
  label {
    display: block;
    margin-bottom: .2em;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #000000;
  padding-top: 2em;
  width: 40%;
  color: #817f7f;
`;

const InputArea = styled.div`
  margin-block: .8em;

  input {
    width: 100%;
  }

  p {
    width: 100%;
  }
`;

export default function SignUpForm({ navigate }) {
  const signUpFormStore = useSignUpFormStore();

  const {
    name,
    phoneNumber,
    userName,
    password,
    confirmPassword,
    errors,
    signUpError,
  } = signUpFormStore;

  const handleClickSignUp = async () => {
    const registeredName = await signUpFormStore.signUp();

    if (!registeredName) {
      return;
    }

    navigate('/signup/success');
  };

  return (
    <Container>
      <h2>SIGN UP</h2>
      <Form>
        <InputArea>
          <label htmlFor="input-name">
            이름 :
          </label>
          <Input
            id="input-name"
            type="text"
            error={errors.name}
            value={name}
            onChange={(e) => signUpFormStore.changeName(e.target.value)}
          />
          <Error>
            {errors.name
              ? errors.name
              : <strong>3-7자까지 한글만 사용 가능</strong>}
          </Error>
        </InputArea>
        <InputArea>
          <label htmlFor="input-userName">
            아이디 :
          </label>
          <Input
            id="input-userName"
            type="text"
            error={errors.userName || signUpError}
            value={userName}
            onChange={(e) => signUpFormStore.changeUserName(e.target.value)}
          />
          <Error>
            {errors.userName
              ? errors.userName
              : <strong>영문소문자/숫자, 4~16자만 사용 가능</strong>}
          </Error>
        </InputArea>
        <InputArea>
          <label htmlFor="input-password">
            비밀번호 :
          </label>
          <Input
            id="input-password"
            type="password"
            error={errors.password}
            value={password}
            onChange={(e) => signUpFormStore.changePassword(e.target.value)}
          />
          <Error>
            {errors.password
              ? errors.password
              : <strong>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</strong>}
          </Error>
        </InputArea>
        <InputArea>
          <label htmlFor="input-confirm-password">
            비밀번호 확인 :
          </label>
          <Input
            id="input-confirm-password"
            type="password"
            error={errors.confirmPassword}
            value={confirmPassword}
            onChange={(e) => signUpFormStore.changeConfirmPassword(e.target.value)}
          />
          <Error>
            {errors.confirmPassword
              ? errors.confirmPassword
              : null}
          </Error>
        </InputArea>
        <InputArea>
          <label htmlFor="input-phone-number">
            전화번호 :
          </label>
          <Input
            id="input-phone-number"
            type="tel"
            error={errors.phoneNumber}
            value={phoneNumber}
            onChange={(e) => signUpFormStore.changePhoneNumber(e.target.value)}
          />
          <Error>
            {errors.phoneNumber
              ? errors.phoneNumber
              : null}
          </Error>
        </InputArea>
        <Error>
          {signUpError}
        </Error>
        <PrimaryButton
          type="button"
          onClick={handleClickSignUp}
        >
          회원가입
        </PrimaryButton>
      </Form>
    </Container>
  );
}

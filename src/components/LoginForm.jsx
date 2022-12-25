/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import useUserStore from '../hooks/useUserStore';

import Error from './ui/Error';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
  align-items: center;

  label {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 2em;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-top: 2px solid #99CCFF;
  padding-top: 2em;
  width: 25%;
`;

const Input = styled.input`
  margin-bottom: .6em;
  padding: 1em 1.5em;
  width: 100%;
  border: ${(props) => (props.error ? '1px solid #ff0000' : '1px solid #a29f9f')};
  :focus {
    outline: 1px solid #99CCFF;
  }
`;

export default function LoginForm({ navigate }) {
  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const userStore = useUserStore();

  const { loginError } = userStore;

  const onSubmit = async (data) => {
    const { userName, password } = data;
    const accessToken = await userStore.login({ userName, password });
    if (accessToken) {
      setAccessToken(accessToken);

      navigate('/');
    }
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title>USER LOGIN</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-userName">
            아이디
          </label>
          <Input
            id="input-userName"
            type="text"
            placeholder="아이디"
            {...register(
              'userName',
              { required: { value: true, message: '아이디를 입력해주세요' } },
            )}
          />
        </div>
        <div>
          <label htmlFor="input-password">
            비밀번호
          </label>
          <Input
            id="input-password"
            type="password"
            placeholder="비밀번호"
            {...register(
              'password',
              { required: { value: true, message: '비밀번호를 입력해주세요' } },
            )}
          />
        </div>
        <Error>
          {/* TODO 로그인에러처리 변경 */}
          {errors.userName
            ? errors.userName.message
            : errors.password
              ? errors.password.message
              : loginError || null}
        </Error>
        <PrimaryButton type="submit">
          로그인
        </PrimaryButton>
        <button
          type="button"
          onClick={handleClickSignUp}
        >
          회원가입
        </button>
      </Form>
    </Container>
  );
}

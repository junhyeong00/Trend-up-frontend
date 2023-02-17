/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';

import useCartStore from '../hooks/useCartStore';
import useUserStore from '../hooks/useUserStore';

import Error from './ui/Error';
import PrimaryButton from './ui/PrimaryButton';
import Input from './ui/Input';

import kakaoConfig from '../../kakao.config';

import logo from '../images/TRENDUP.png';

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
  font-size: 1.7em;
  font-weight: bold;
  text-align: center;

  img {
    width: 90%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* border-top: 2px solid #000000; */
  padding-top: 2em;

  input {
    width: 100%;
    padding: 1em 1em;
  }
`;

const SNS = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.4em;
  margin-inline: auto;
  width: 70%;
`;

const SNSlogin = styled.p`
  font-size: 0.75em;
  text-align: center;
  margin-bottom: 1em;
  color: #797979;
`;

const KaKaoButton = styled.a`
  img {
      width: 100%;
      object-fit: cover;
  }
`;

const Signup = styled.div`
  display: flex;
  justify-content: center;
  gap: .7em;
  margin-top: 1em;

  p {
    color: #A0A0A0;
  }

  button {
    background: none;
    border: 0;
    color: #000000;
    font-weight: bold;
    font-size: 1em;
  }
`;

export default function LoginForm({ navigate }) {
  const [, setAccessToken] = useLocalStorage('accessToken', '');
  const [, setCart] = useLocalStorage('cart', '{"items":[]}');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const userStore = useUserStore();
  const cartStore = useCartStore();

  const { loginError } = userStore;

  const onSubmit = async (data) => {
    const { userName, password } = data;
    const accessToken = await userStore.login({ userName, password });

    if (accessToken) {
      setAccessToken(accessToken);

      const itmes = await cartStore.fetchCart();

      setCart(itmes);

      navigate('-1');
    }
  };

  const handleClickSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Title>
        <img src={logo} alt="trendup" />
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="input-userName">
            아이디
          </label>
          <Input
            id="input-userName"
            type="text"
            placeholder="아이디"
            error={errors.userName}
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
            error={errors.password}
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
        <SNS>
          <SNSlogin>SNS계정으로 간편 로그인/회원가입</SNSlogin>
          <KaKaoButton href={kakaoConfig.kakaoAuthUrl}>
            <img src="https://user-images.githubusercontent.com/104840243/202971385-ee1b510d-e434-4da4-832a-2de9ebb622a7.png" alt="" />
          </KaKaoButton>
        </SNS>
        <Signup>
          <p>아직 회원이 아니신가요?</p>
          <button
            type="button"
            onClick={handleClickSignUp}
          >
            회원가입
          </button>
        </Signup>
      </Form>
    </Container>
  );
}

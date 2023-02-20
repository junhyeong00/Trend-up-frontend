import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  a {
    margin-top: 1em;
    padding: 1.1em 3em;
    border: none;
    border-radius: 10px;
    background-color: #000000;
    color: #FFF;
    width: 60%;
    text-align: center;
  }
  p {
    margin-block: .2em;
  }
`;

const H1 = styled.h1`
  margin: 1em;
  font-size: 1.7em;
  font-weight: bold;
`;

export default function SignupSuccessPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <H1>회원가입 완료</H1>
      <p>회원가입이 완료되었습니다.</p>
      <p>정상적인 서비스 이용을 위해 로그인을 진행해주세요.</p>
      <Link to="/login">로그인하기</Link>
    </Container>
  );
}

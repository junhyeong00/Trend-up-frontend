import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import My from '../components/My';
import MyPageNavigation from '../components/MyPageNavigation';
import useOrdersStore from '../hooks/useOrdersStore';

import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  > div:first-child {
    width: 100vw;
    height: 14em;
    background: linear-gradient(91.68deg, #000000 -0.67%, #244552 100%);
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  width: 65%;
  margin: 0 auto;
  padding: 1em;
`;

const Status = styled.div`
  min-width: 1080px;
  width: 65%;
  height: 100%;
  margin: 0 auto;
  display: flex;
`;

const Profile = styled.div`
  height: 100%;
  margin-right: 3.5em;
  padding: 1em;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
`;

const Delivery = styled.div`
  display: flex;
  width: 50%;
  gap: 1em;

  div {
    width: 50%;
    height: 75%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    padding: 1.5em;
    align-self: center;
    text-align: center;
  }

  h3 {
    font-size: 1.36em;
  }

  p {
    margin-top: 3em;
    font-size: 1.2em;
  }
`;

export default function MyPage() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const ordersStore = useOrdersStore();

  const {
    shippedCount, inTransitCount,
  } = ordersStore;

  const { name, userName } = userStore;

  return (
    <Container>
      <div>
        <Status>
          <Profile>
            <h3>
              {name}
              님
            </h3>
            <p>
              {userName}
            </p>
          </Profile>
          <Delivery>
            <div>
              <h3>배송준비중</h3>
              <p>
                {shippedCount}
                개
              </p>
            </div>
            <div>
              <h3>배송중</h3>
              <p>
                {inTransitCount}
                개
              </p>
            </div>
          </Delivery>
        </Status>
      </div>
      <Wrapper>
        <MyPageNavigation />
        <My
          navigate={navigate}
        />
      </Wrapper>
    </Container>
  );
}

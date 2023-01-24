import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  padding: 1em;
  border: 1px solid black;
  background: linear-gradient(91.68deg, #000000 -0.67%, #325f6f 100%);
  color: #FFFFFF;
`;

export default function Profile() {
  const userStore = useUserStore();

  const { name, userName } = userStore;

  return (
    <Container>
      <p>
        {name}
        님
      </p>
      <p>{userName}</p>
    </Container>
  );
}

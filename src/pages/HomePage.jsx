import styled from 'styled-components';
import Recommend from '../components/Recommend';

import image from '../images/main.png';

const Container = styled.div`
      width: 65%;
      margin: 0 auto auto;
      display: flex;
      flex-direction: column;
`;

const Image = styled.img`

  display: block;
`;

export default function HomePage() {
  return (
    <Container>
      <Image src={image} alt="main" />
      <Recommend />
    </Container>
  );
}

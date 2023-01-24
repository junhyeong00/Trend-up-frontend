import styled from 'styled-components';

const Container = styled.ul`
  margin-block: 2em;
  display: flex;
  justify-content: center;
  gap: .4em;
`;

const PageNumber = styled.button`
  background: none;
  border: none;
  color: #9A9A9A;
  &:focus {
    color: #000;
  }
`;

export default function PageNumbers({
  totalPageCount, handlePageClick,
}) {
  const pages = Array(totalPageCount).fill(0)
    .map((element, index) => index + 1);

  return (
    <Container>
      {pages.map((page) => (
        <li key={page}>
          <PageNumber
            type="button"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageNumber>
        </li>
      ))}
    </Container>
  );
}

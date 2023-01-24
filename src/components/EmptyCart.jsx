import styled from 'styled-components';

import defaultTheme from '../styles/DefaultTheme';

const Table = styled.table`
  border-top: 1px solid ${defaultTheme.colors.fourth};
  border-bottom: 1px solid ${defaultTheme.colors.fourth} ;
  width: 100%;
  border-collapse: collapse;
  thead {
    font-size: .9em;
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
    height: 2.5em;
  }
  th, td {
    vertical-align: middle;
    text-align: center;
    font-size: .8em;
    color: ${defaultTheme.colors.sixth};
  }
  tr {
    border-bottom: 1px solid ${defaultTheme.colors.fourth};
  }
  th {
    color: ${defaultTheme.colors.fourthText}
  }
  th:first-child {
    width: 20%;
  }
  th:nth-child(2) {
    text-align: right;
    width: 60%;
  }
  th:nth-child(3) {
    width: 15%;
  }
  th:nth-child(4) {
    width: 15%;
  }
  td {
    height: 20em;
  }
  td:last-child {
    border: none;
  }
  p {
    color: ${defaultTheme.colors.fourthText};
  }
`;

export default function EmptyCart() {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>상품 정보</th>
            <th>옵션</th>
            <th>수량</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>
              <p>장바구니가 비어있습니다.</p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

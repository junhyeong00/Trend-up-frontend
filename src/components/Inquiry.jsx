import styled from 'styled-components';

import { useState } from 'react';

const Tbody = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: 1.2fr 5fr 1.3fr 1.3fr;
  cursor: pointer;

  p {
    text-align: center;
    vertical-align: middle;
  }

  p:nth-child(2){
  text-align: start;
  }
`;

const Detail = styled.div`
  display: ${(props) => (props.open ? '' : 'none')};
`;

export default function Inquiry({ inquiry }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Tbody type="button" onClick={handleClick}>
        <p>{inquiry.answerStatus}</p>
        <p>
          {inquiry.title}
          {inquiry.isSecret && !inquiry.isMine ? ' 🔒' : ''}
        </p>
        <p>{inquiry.userName}</p>
        <p>{inquiry.createAt}</p>
      </Tbody>
      <Detail open={open}>
        <p>{inquiry.content}</p>
        {inquiry.isMine ? (
          <div>
            <button type="button">수정</button>
            <button type="button">삭제</button>
          </div>
        ) : null}
      </Detail>
    </div>
  );
}

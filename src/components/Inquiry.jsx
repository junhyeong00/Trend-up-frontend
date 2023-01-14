import styled from 'styled-components';

import { useState } from 'react';

const Tbody = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: 10em 5fr 1.3fr 1fr;
  align-items: center;
  cursor: pointer;

  p {
    text-align: center;
  }

  p:nth-child(2){
    text-align: start;
  }
`;

const Detail = styled.div`
  display: ${(props) => (props.open ? '' : 'none')};
  width: 100%;
  padding-left: 10em;

  > div {
    padding: 1em;
  }
`;

const Answer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1.3fr 1fr;
  align-items: center;
  border-top: 1px solid gray;

  p {
    text-align: center;
  }

  pre {
    padding-top: .5em;
  }
  
  h4 {
    width: 2.3em;
    border: 1px solid black;
    border-radius: 5px;
    padding: .2em;
    font-size: .9em;
  }
`;

export default function Inquiry({ inquiry, handleClickDelete, handleClickEdit }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Tbody type="button" onClick={handleClick}>
        <p>{inquiry.answerStatus ? '답변완료' : '미답변'}</p>
        <p>
          {inquiry.title}
          {inquiry.isSecret && !inquiry.isMine ? ' 🔒' : ''}
        </p>
        <p>{inquiry.userName}</p>
        <p>{inquiry.createAt}</p>
      </Tbody>
      <Detail open={open}>
        <div>
          <pre>{inquiry.content}</pre>
          {inquiry.isMine ? (
            <div>
              <button
                type="button"
                onClick={() => handleClickEdit((inquiry.id))}
              >
                수정
              </button>
              <button
                type="button"
                onClick={() => handleClickDelete(inquiry.id)}
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
        {inquiry.answerStatus ? (
          <Answer>
            <div>
              <h4>답변</h4>
              <pre>{inquiry.comment}</pre>
            </div>
            <p>관리자</p>
            <p>{inquiry.answerCreateAt}</p>
          </Answer>
        ) : null}
      </Detail>
    </div>
  );
}

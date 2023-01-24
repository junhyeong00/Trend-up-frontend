import styled from 'styled-components';

import { useState } from 'react';

import lock from '../images/lock.png';

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
  background-color: #F8F8F8;
  border-bottom: 1px solid #D9D9D9;

  > div {
    padding: 1em;
  }
`;

const Answer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1.3fr 1fr;
  align-items: center;
  border-top: 1px solid #D9D9D9;

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

const My = styled.div`
  display: grid;
  grid-template-columns: 8.8fr 1fr;
  align-items: center;
`;

const Buttons = styled.div`
  button {
    background: none;
    color: #808080;
    border: 0;
    padding: .2em .4em;
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
          {' '}
          {inquiry.isSecret && !inquiry.isMine
            ? <img src={lock} alt="비공개" /> : null}
        </p>
        <p>{inquiry.userName}</p>
        <p>{inquiry.createAt}</p>
      </Tbody>
      <Detail open={open}>
        <My>
          <pre>{inquiry.content}</pre>
          {inquiry.isMine ? (
            <Buttons>
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
            </Buttons>
          ) : null}
        </My>
        {inquiry.answerStatus && !inquiry.isSecret ? (
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

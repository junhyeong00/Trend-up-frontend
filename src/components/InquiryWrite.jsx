/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Error from './ui/Error';

const Form = styled.form`
  padding: 1em;
`;

export default function InquiryWrite({
  onClickRegister, onClickCancel,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { title, content, isSecret } = data;

    onClickRegister({ title, content, isSecret });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input-title">제목:</label>
        <input
          id="input-title"
          {...register(
            'title',
            {
              required: {
                value: true, message: '제목을 입력해주세요',
              },
            },
          )}
        />
        {errors.title
          ? <Error>{errors.title.message}</Error> : null}
      </div>
      <div>
        <label htmlFor="input-content">내용:</label>
        <textarea
          id="input-content"
          rows="12"
          cols="55"
          maxLength="1000"
          {...register(
            'content',
            {
              required: {
                value: true, message: '내용을 입력해주세요',
              },
            },
          )}
        />
        {errors.content
          ? <Error>{errors.content.message}</Error> : null}
      </div>
      <input
        id="checkbox-secret"
        type="checkbox"
        {...register(
          'isSecret',
        )}
      />
      <label htmlFor="checkbox-secret">비밀글</label>
      <button
        type="button"
        onClick={onClickCancel}
      >
        취소
      </button>
      <button
        type="submit"
      >
        등록
      </button>
    </Form>
  );
}

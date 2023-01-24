/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Error from './ui/Error';
import Input from './ui/Input';
import PrimaryButton from './ui/PrimaryButton';
import SecondaryButton from './ui/SecondaryButton';
import Textarea from './ui/Textarea';

const Form = styled.form`
  padding: 1em;

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
  }
`;

const Private = styled.div`
  display: flex;
  width: 10%;

  label {
    width: 100%;
    color: ${((props) => props.theme.colors.fourthText)};
  }
`;

const Label = styled.label`
  display: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;  
  gap: .7em;

  button {
    border-radius: 4px;
    padding: .8em 2em;
  }
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
        <Label htmlFor="input-title">제목:</Label>
        <Input
          id="input-title"
          placeholder="제목을 입력하세요"
          error={errors.title}
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
        <Label htmlFor="input-content">내용:</Label>
        <Textarea
          id="input-content"
          rows="12"
          cols="55"
          maxLength="1000"
          placeholder="문의하실 내용을 입력하세요"
          error={errors.content}
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
      <Private>
        <input
          id="checkbox-secret"
          type="checkbox"
          {...register(
            'isSecret',
          )}
        />
        <label htmlFor="checkbox-secret">비밀글</label>
      </Private>
      <Buttons>
        <SecondaryButton
          type="button"
          onClick={onClickCancel}
        >
          취소
        </SecondaryButton>
        <PrimaryButton
          type="submit"
        >
          등록
        </PrimaryButton>
      </Buttons>
    </Form>
  );
}

import styled from 'styled-components';

const Input = styled.input`
  /* width: 100%; */
  padding: .7em;
  margin-bottom: .7em;
  border: 1px solid ${(props) => (
    props.error
      ? props.theme.colors.red
      : props.theme.colors.fourth
  )
};
  :focus {
    border-color: #000000;
    outline: none;
  }
  ::placeholder {
    color: ${((props) => props.theme.colors.fourthText)};
  }
`;

export default Input;

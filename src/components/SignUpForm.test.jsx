import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';

import SignUpForm from './SignUpForm';

const navigate = jest.fn();

describe('SignUpForm', () => {
  afterEach(() => {
    cleanup();
  });

  function renderSignUpForm() {
    render(
      <SignUpForm
        navigate={navigate}
      />,
    );
  }

  it('render screen', async () => {
    renderSignUpForm();

    await waitFor(() => {
      screen.getByText('SIGN UP');
      screen.getByText('회원가입');
    });
  });
});

import { render } from '@testing-library/react';

import SignUpPage from './SignUpPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('SignUpPage', () => {
  it('renders screen', () => {
    render(
      <SignUpPage />,
    );
  });
});

import { cleanup, render } from '@testing-library/react';
import ReviewManagementPage from './ReviewManagementPage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate: () => (
    navigate
  ),
}));

describe('ReviewManagementPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('render screen', () => {
    render(<ReviewManagementPage />);
  });
});

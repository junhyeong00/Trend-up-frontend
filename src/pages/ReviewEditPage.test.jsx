import { cleanup, render } from '@testing-library/react';
import ReviewEditPage from './ReviewEditPage';

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
  useLocation: () => ({
    state: {
      reviewId: 1,
    },
  }),
}));

describe('ReviewEditPage', () => {
  afterEach(() => {
    cleanup();
  });

  it('render screen', () => {
    render(<ReviewEditPage />);
  });
});

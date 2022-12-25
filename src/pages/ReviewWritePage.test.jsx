import { render } from '@testing-library/react';

import ReviewWritePage from './ReviewWritePage';

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
      orderId: 1,
      product: { productName: '가디건' },
    },
  }),
}));

describe('ReviewWritePage', () => {
  it('render screen', () => {
    render(<ReviewWritePage />);
  });
});

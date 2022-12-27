import { render } from '@testing-library/react';
import ReviewManagementPage from './ReviewManagementPage';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('ReviewManagementPage', () => {
  it('render screen', () => {
    render(<ReviewManagementPage />);
  });
});

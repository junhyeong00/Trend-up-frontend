import { cleanup, render } from '@testing-library/react';

import MyPage from './MyPage';

const navigate = jest.fn();

const ko = {};

jest.mock('nanoid', () => ({ nanoid: () => '1234' }));

jest.mock('react-datepicker/dist/react-datepicker.css', () => null);

jest.mock('date-fns/esm/locale', () => () => ({
  ko,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('MyPage', () => {
  it('render screen', () => {
    render(<MyPage />);

    cleanup();
  });
});

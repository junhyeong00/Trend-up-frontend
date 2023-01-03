import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import categoriesStore from '../stores/CategoriesStore';

import Category from './Category';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({

  useNavigate() {
    return navigate;
  },
}));

describe('Category', () => {
  afterEach(() => {
    cleanup();
  });

  function renderCategory() {
    render(<Category />);
  }

  it('renders screen', async () => {
    renderCategory();

    await waitFor(() => {
      screen.getByText('전체');
      screen.getByText('상의');
      screen.getByText('하의');
    });
  });

  it('listens for category search event', () => {
    renderCategory();

    fireEvent.click(screen.getByText('상의'));

    expect(navigate).toBeCalledWith('/products');
  });
});

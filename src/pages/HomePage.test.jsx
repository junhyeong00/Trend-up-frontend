import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('메인화면', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    screen.getByText('전체');

    cleanup();
  });
});

  import { render, screen } from '@testing-library/react';
  import { test, expect } from 'vitest';
  import userEvent from '@testing-library/user-event';
  import LikeCompany from './LikeCompany';

  test('increments like count and disables button', async () => {
    render(<LikeCompany />);

    const btn = screen.getByTestId('like-button');
    const count = screen.getByTestId('like-count');
    expect(count.textContent).toMatch(/610/);

    await userEvent.click(btn);

    expect(btn).toBeDisabled();
    expect(count.textContent).toMatch(/611/);
  });
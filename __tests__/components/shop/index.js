import React from 'react';
import { render, screen } from '../../../test-utils';

test('Should render <Shop> component with children', async () => {
  await render(<button>Testing</button>);

  const element = await screen.getByRole('button', { name: 'Testing' });
  expect(element).toBeInTheDocument();
});

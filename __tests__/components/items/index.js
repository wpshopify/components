import React from 'react';
import { render, screen } from '../../../test-utils';

test('Should render a root container and <Items> component with an arbitrary child', async () => {
  await render(<button>Testing</button>);

  const itemsChild = await screen.getByText('Testing');

  expect(itemsChild).toHaveTextContent('Testing');
});

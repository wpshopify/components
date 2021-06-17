import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "hideQuantity" should show by default', async () => {
  await render(<Products />);

  const component = await screen.findByLabelText('Product Quantity');

  expect(component).toBeInTheDocument();
});

test('Attribute "hideQuantity" should be hidden', async () => {
  await render(<Products />, {
    customSettings: {
      hideQuantity: true,
    },
  });

  const component = await screen.queryByLabelText('Product Quantity');

  expect(component).not.toBeInTheDocument();
});

test('Attribute "hideQuantity" should be visible', async () => {
  await render(<Products />, {
    customSettings: {
      hideQuantity: false,
    },
  });

  const component = await screen.findByLabelText('Product Quantity');

  expect(component).toBeInTheDocument();
});

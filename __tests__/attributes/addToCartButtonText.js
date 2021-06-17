import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonText" should change text', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonText: 'Add me!',
    },
  });

  const BuyButtonComponent = await screen.findByLabelText('Product Buy Button');

  expect(BuyButtonComponent).toHaveTextContent('Add me!');
});

test('Attribute "addToCartButtonText" should not be empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonText: '',
    },
  });

  const BuyButtonComponent = await screen.findByLabelText('Product Buy Button');

  expect(BuyButtonComponent).toHaveTextContent('Add to cart');
});

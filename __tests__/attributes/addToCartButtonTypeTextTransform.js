import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeTextTransform" should have default transform', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-transform: initial;
   `);
});

test('Attribute "addToCartButtonTypeTextTransform" should set text to uppercase', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextTransform: 'uppercase',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-transform: uppercase;
   `);
});

test('Attribute "addToCartButtonTypeTextTransform" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextTransform: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-transform: initial;
   `);
});

test('Attribute "addToCartButtonTypeTextTransform" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextTransform: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-transform: initial;
   `);
});

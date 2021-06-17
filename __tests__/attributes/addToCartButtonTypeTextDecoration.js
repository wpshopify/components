import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeTextDecoration" should have default transform', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-decoration: initial;
   `);
});

test('Attribute "addToCartButtonTypeTextDecoration" should be set to underline', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextDecoration: 'underline',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-decoration: underline;
   `);
});

test('Attribute "addToCartButtonTypeTextDecoration" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextDecoration: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-decoration: initial;
   `);
});

test('Attribute "addToCartButtonTypeTextDecoration" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeTextDecoration: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      text-decoration: initial;
   `);
});

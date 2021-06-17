import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeFontWeight" should have default weight', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-weight: initial;
   `);
});

test('Attribute "addToCartButtonTypeFontWeight" should have custom weight', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontWeight: 200,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-weight: 200;
   `);
});

test('Attribute "addToCartButtonTypeFontWeight" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontWeight: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-weight: initial;
   `);
});

test('Attribute "addToCartButtonTypeFontWeight" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontWeight: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-weight: initial;
   `);
});

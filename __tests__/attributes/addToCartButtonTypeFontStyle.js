import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeFontStyle" should have default font-style', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-style: initial;
   `);
});

test('Attribute "addToCartButtonTypeFontStyle" should have italic style', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontStyle: 'italic',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-style: italic;
   `);
});

test('Attribute "addToCartButtonTypeFontStyle" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontStyle: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-style: initial;
   `);
});

test('Attribute "addToCartButtonTypeFontStyle" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontStyle: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-style: initial;
   `);
});

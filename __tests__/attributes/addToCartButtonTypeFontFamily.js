import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeFontFamily" should have default font', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-family: inherit;
   `);
});

test('Attribute "addToCartButtonTypeFontFamily" should have custom font', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontFamily: 'Helvetica',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-family: Helvetica;
   `);
});

test('Attribute "addToCartButtonTypeFontFamily" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontFamily: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-family: inherit;
   `);
});

test('Attribute "addToCartButtonTypeFontFamily" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontFamily: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-family: inherit;
   `);
});

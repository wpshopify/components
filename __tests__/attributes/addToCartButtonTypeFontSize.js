import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeFontSize" should have default size', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-size: inherit;
   `);
});

test('Attribute "addToCartButtonTypeFontSize" should have custom size', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontSize: '12px',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-size: 12px;
   `);
});

test('Attribute "addToCartButtonTypeFontSize" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontSize: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-size: inherit;
   `);
});

test('Attribute "addToCartButtonTypeFontSize" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeFontSize: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      font-size: inherit;
   `);
});

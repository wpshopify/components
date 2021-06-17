import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeLineHeight" should have default line-height', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      line-height: initial;
   `);
});

test('Attribute "addToCartButtonTypeLineHeight" should set text to 3', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLineHeight: 3,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      line-height: 3;
   `);
});

test('Attribute "addToCartButtonTypeLineHeight" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLineHeight: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      line-height: initial;
   `);
});

test('Attribute "addToCartButtonTypeLineHeight" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLineHeight: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      line-height: initial;
   `);
});

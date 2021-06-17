import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTypeLetterSpacing" should have default letter-spacing', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      letter-spacing: initial;
   `);
});

test('Attribute "addToCartButtonTypeLetterSpacing" should set text to 1px', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLetterSpacing: '1px',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      letter-spacing: 1px;
   `);
});

test('Attribute "addToCartButtonTypeLetterSpacing" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLetterSpacing: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      letter-spacing: initial;
   `);
});

test('Attribute "addToCartButtonTypeLetterSpacing" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTypeLetterSpacing: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      letter-spacing: initial;
   `);
});

import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonColor" should have default color', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      background-color: rgb(65, 90, 255);
   `);
});

test('Attribute "addToCartButtonColor" should be red', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonColor: 'red',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      background-color: red;
   `);
});

test('Attribute "addToCartButtonColor" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonColor: '',
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      background-color: rgb(65, 90, 255);
   `);
});

test('Attribute "addToCartButtonColor" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonColor: false,
    },
  });

  const BuyButtonComponent = await screen.findByRole('Button');

  expect(BuyButtonComponent).toHaveStyle(`
      background-color: rgb(65, 90, 255);
   `);
});

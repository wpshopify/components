import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "addToCartButtonTextColor" default text color should be inherit', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByLabelText('Product Add to Cart Text');

  expect(BuyButtonComponent).toHaveStyle(`
      color: inherit;
   `);
});

test('Attribute "addToCartButtonTextColor" should change text color to black', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTextColor: 'black',
    },
  });

  const BuyButtonComponent = await screen.findByLabelText('Product Add to Cart Text');

  expect(BuyButtonComponent).toHaveStyle(`
      color: black;
   `);
});

test('Attribute "addToCartButtonTextColor" should not change text color when set to false', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTextColor: false,
    },
  });

  const BuyButtonComponent = await screen.findByLabelText('Product Add to Cart Text');

  expect(BuyButtonComponent).toHaveStyle(`
        color: inherit;
   `);
});

test('Attribute "addToCartButtonTextColor" should not change text color when set to empty string', async () => {
  await render(<Products />, {
    customSettings: {
      addToCartButtonTextColor: '',
    },
  });

  const BuyButtonComponent = await screen.findByLabelText('Product Add to Cart Text');

  expect(BuyButtonComponent).toHaveStyle(`
        color: inherit;
   `);
});

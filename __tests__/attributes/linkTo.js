import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "linkTo" should not link anywhere', async () => {
  await render(<Products />);

  const BuyButtonComponent = await screen.findByLabelText('Product Buy Button');

  expect(BuyButtonComponent).toBeInTheDocument();
  expect(BuyButtonComponent).toHaveTextContent('Add to cart');
});

test('Attribute "linkTo" should link to wordpress', async () => {
  await render(<Products />, {
    customSettings: {
      linkTo: 'wordpress',
    },
  });

  const ProductLinkComponents = await screen.findAllByLabelText('Product Link');

  expect(ProductLinkComponents[0]).toBeInTheDocument();
  expect(ProductLinkComponents[0]).toHaveAttribute(
    'href',
    expect.stringContaining('/products/super-awesome-dress-shirt')
  );
});

test('Attribute "linkTo" should link to shopify', async () => {
  await render(<Products />, {
    customSettings: {
      linkTo: 'shopify',
    },
  });

  const ProductLinkComponents = await screen.findAllByLabelText('Product Link');

  expect(ProductLinkComponents[0]).toBeInTheDocument();
  expect(ProductLinkComponents[0]).toHaveAttribute(
    'href',
    expect.stringContaining('https://scripts.blog/products/super-awesome-dress-shirt')
  );
});

import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "excludes" should hide "title"', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: ['title'],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).not.toHaveTextContent('Super awesome dress shirt');
});

test('Attribute "excludes" should hide "pricing"', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: ['pricing'],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).not.toHaveTextContent('Price:');
});

test('Attribute "excludes" should hide "description"', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: ['description'],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).not.toHaveTextContent(
    'Aut eos ad labore. Eaque ut consectetur et consequatur sit est.'
  );
});

test('Attribute "excludes" should hide "buy button"', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: ['buy-button'],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).not.toHaveTextContent('Add to cart');
});

test('Attribute "excludes" should hide "images"', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: ['images'],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).not.toHaveTextContent('Sale!');
});

test('Attribute "excludes" should not hide anything', async () => {
  await render(<Products />, {
    customSettings: {
      excludes: [],
    },
  });

  const ProductComponent = await screen.findByLabelText('Product');

  expect(ProductComponent).toHaveTextContent('Super awesome dress shirt');
  expect(ProductComponent).toHaveTextContent('Price:');
  expect(ProductComponent).toHaveTextContent('Sale!');
  expect(ProductComponent).toHaveTextContent(
    'Aut eos ad labore. Eaque ut consectetur et consequatur sit est.'
  );
  expect(ProductComponent).toHaveTextContent('Add to cart');
});

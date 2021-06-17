import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantStyle" should have default variant style', async () => {
  await render(<Products />);

  const VariantComponent = await screen.findByLabelText('Product variant dropdown');

  expect(VariantComponent).toBeInTheDocument();
});

test('Attribute "variantStyle" should show buttons variant style', async () => {
  await render(<Products />, {
    customSettings: {
      variantStyle: 'buttons',
    },
  });

  const VariantComponent = await screen.findByLabelText('Product variant buttons');

  expect(VariantComponent).toBeInTheDocument();
});

test('Attribute "variantStyle" should show buttons dropdown style', async () => {
  await render(<Products />, {
    customSettings: {
      variantStyle: 'dropdown',
    },
  });

  const VariantComponent = await screen.findByLabelText('Product variant dropdown');

  expect(VariantComponent).toBeInTheDocument();
});

test('Attribute "variantStyle" should show buttons dropdown style when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantStyle: '',
    },
  });

  const VariantComponent = await screen.findByLabelText('Product variant dropdown');

  expect(VariantComponent).toBeInTheDocument();
});

test('Attribute "variantStyle" should show buttons dropdown style when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantStyle: false,
    },
  });

  const VariantComponent = await screen.findByLabelText('Product variant dropdown');

  expect(VariantComponent).toBeInTheDocument();
});

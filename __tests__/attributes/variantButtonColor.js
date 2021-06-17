import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantButtonColor" should have default variant color', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
        background-color: rgb(0, 0, 0);
     `);
});

test('Attribute "variantButtonColor" should be red', async () => {
  await render(<Products />, {
    customSettings: {
      variantButtonColor: 'red',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      background-color: red;
   `);
});

test('Attribute "variantButtonColor" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantButtonColor: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      background-color: black;
   `);
});

test('Attribute "variantButtonColor" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantButtonColor: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      background-color: black;
   `);
});

import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeFontFamily" should have default font', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-family: inherit;
   `);
});

test('Attribute "variantDropdownTypeFontFamily" should have custom font', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontFamily: 'Helvetica',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-family: Helvetica;
   `);
});

test('Attribute "variantDropdownTypeFontFamily" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontFamily: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-family: inherit;
   `);
});

test('Attribute "variantDropdownTypeFontFamily" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontFamily: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-family: inherit;
   `);
});

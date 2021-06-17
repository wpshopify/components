import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeFontWeight" should have default weight', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-weight: initial;
   `);
});

test('Attribute "variantDropdownTypeFontWeight" should have custom weight', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontWeight: 200,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-weight: 200;
   `);
});

test('Attribute "variantDropdownTypeFontWeight" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontWeight: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-weight: initial;
   `);
});

test('Attribute "variantDropdownTypeFontWeight" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontWeight: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-weight: initial;
   `);
});

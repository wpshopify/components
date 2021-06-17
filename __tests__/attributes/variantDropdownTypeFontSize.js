import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeFontSize" should have default size', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  // 18px comes from ButtonCSS
  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-size: 18px;
   `);
});

test('Attribute "variantDropdownTypeFontSize" should have custom size', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontSize: '12px',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-size: 12px;
   `);
});

test('Attribute "variantDropdownTypeFontSize" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontSize: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  // 18px comes from ButtonCSS
  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-size: 18px;
   `);
});

test('Attribute "variantDropdownTypeFontSize" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeFontSize: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  // 18px comes from ButtonCSS
  expect(VariantButtonComponent[0]).toHaveStyle(`
      font-size: 18px;
   `);
});

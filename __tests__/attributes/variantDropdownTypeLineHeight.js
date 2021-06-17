import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeLineHeight" should have default line-height', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      line-height: initial;
   `);
});

test('Attribute "variantDropdownTypeLineHeight" should set text to 3', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLineHeight: 3,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      line-height: 3;
   `);
});

test('Attribute "variantDropdownTypeLineHeight" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLineHeight: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      line-height: initial;
   `);
});

test('Attribute "variantDropdownTypeLineHeight" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLineHeight: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      line-height: initial;
   `);
});

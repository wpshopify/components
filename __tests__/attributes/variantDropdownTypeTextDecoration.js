import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeTextDecoration" should have default transform', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-decoration: initial;
   `);
});

test('Attribute "variantDropdownTypeTextDecoration" should be set to underline', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextDecoration: 'underline',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-decoration: underline;
   `);
});

test('Attribute "variantDropdownTypeTextDecoration" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextDecoration: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-decoration: initial;
   `);
});

test('Attribute "variantDropdownTypeTextDecoration" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextDecoration: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-decoration: initial;
   `);
});

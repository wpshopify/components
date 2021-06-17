import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeTextTransform" should have default transform', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-transform: initial;
   `);
});

test('Attribute "variantDropdownTypeTextTransform" should set text to uppercase', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextTransform: 'uppercase',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-transform: uppercase;
   `);
});

test('Attribute "variantDropdownTypeTextTransform" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextTransform: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-transform: initial;
   `);
});

test('Attribute "variantDropdownTypeTextTransform" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeTextTransform: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      text-transform: initial;
   `);
});

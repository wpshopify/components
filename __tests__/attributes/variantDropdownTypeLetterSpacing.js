import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTypeLetterSpacing" should have default letter-spacing', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      letter-spacing: initial;
   `);
});

test('Attribute "variantDropdownTypeLetterSpacing" should set text to 1px', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLetterSpacing: '1px',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      letter-spacing: 1px;
   `);
});

test('Attribute "variantDropdownTypeLetterSpacing" should be default when empty', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLetterSpacing: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      letter-spacing: initial;
   `);
});

test('Attribute "variantDropdownTypeLetterSpacing" should be default when false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTypeLetterSpacing: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      letter-spacing: initial;
   `);
});

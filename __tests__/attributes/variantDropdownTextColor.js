import * as React from 'react';
import Products from '../../components/products';
import { render, screen } from '../../test-utils';

test('Attribute "variantDropdownTextColor" default text color should be inherit', async () => {
  await render(<Products />);

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      color: rgb(255, 255, 255);
   `);
});

test('Attribute "variantDropdownTextColor" should change text color to black', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTextColor: 'black',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
      color: black;
   `);
});

test('Attribute "variantDropdownTextColor" should not change text color when set to false', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTextColor: false,
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
        color: white;
   `);
});

test('Attribute "variantDropdownTextColor" should not change text color when set to empty string', async () => {
  await render(<Products />, {
    customSettings: {
      variantDropdownTextColor: '',
    },
  });

  const VariantButtonComponent = await screen.findAllByLabelText('Product Variant Dropdown');

  expect(VariantButtonComponent[0]).toHaveStyle(`
        color: white;
   `);
});

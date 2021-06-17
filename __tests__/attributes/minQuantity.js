import * as React from 'react';
import Products from '../../components/products';
import { render, screen, userEvent } from '../../test-utils';

test('Attribute "minQuantity" should be 1 by default', async () => {
  await render(<Products />);

  const component = await screen.findByLabelText('Product Quantity Input');

  userEvent.tab();
  expect(component).toHaveFocus();
  userEvent.type(component, '{arrowup}');
  userEvent.tab();

  expect(component).toHaveValue('2');

  //   screen.debug(component);
  //   expect(component).toBeInTheDocument();
  // userEvent.click();
});

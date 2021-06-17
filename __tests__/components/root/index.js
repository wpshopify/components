import React from 'react';
import { render, screen } from '../../../test-utils';
import { RootElement } from '../../../components/root';

test('Should render <Root> component with correct attributes', async () => {
  await render(<RootElement payloadSettingsId='one' componentId='two' />);
  const element = await screen.getByRole('products');

  expect(element).toHaveAttribute('data-wpshopify-component');
  expect(element).toHaveAttribute('data-wpshopify-payload-settings', 'one');
  expect(element).toHaveAttribute('data-wpshopify-component-id', 'two');
  expect(element).toHaveAttribute('data-wpshopify-component-type', 'products');
});

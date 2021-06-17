import * as React from 'react';
import Products from '../../../components/products';
import { render, screen } from '../../../test-utils';

test('Should render <Products> component', async () => {
  await render(<Products />);

  const TitleComponent = await screen.findByLabelText('Product Title');
  const PricingComponent = await screen.findByLabelText('Product Pricing');
  const DescriptionComponent = await screen.findByLabelText('Product Description');
  const BuyButtonComponent = await screen.findByLabelText('Product Buy Button');
  const ImagesComponent = await screen.findByLabelText('Product Images');
  const ImagesThumbnailsComponent = await screen.findByLabelText('Product Thumbnails');

  expect(TitleComponent).toBeInTheDocument();
  expect(TitleComponent).toHaveTextContent(/^Super awesome dress shirt$/);

  expect(PricingComponent).toBeInTheDocument();
  expect(PricingComponent).toHaveTextContent(/^Price:\$1.00–\$338.25$/);

  expect(DescriptionComponent).toBeInTheDocument();
  expect(DescriptionComponent).toHaveTextContent(
    /^Aut eos ad labore. Eaque ut consectetur et consequatur sit est.$/
  );

  expect(BuyButtonComponent).toBeInTheDocument();
  expect(BuyButtonComponent).toHaveTextContent(/Add to cart$/);

  expect(ImagesComponent).toBeInTheDocument();
  expect(ImagesComponent).toHaveTextContent(/Sale!$/);
  expect(ImagesComponent).toContainElement(ImagesThumbnailsComponent);
});

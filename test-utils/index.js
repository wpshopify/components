import * as React from 'react';
import { render as rtlRender, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Items } from '../components/items';
import { Shop } from '../components/shop';
import assignIn from 'lodash/assignIn';

const defaultProductOptions = {
  addToCartButtonColor: '#415aff',
  addToCartButtonFont: false,
  addToCartButtonFontSize: false,
  addToCartButtonFontWeight: false,
  addToCartButtonText: 'Add to cart',
  addToCartButtonTextColor: false,
  addToCartButtonTypeFontFamily: false,
  addToCartButtonTypeFontSize: false,
  addToCartButtonTypeFontStyle: false,
  addToCartButtonTypeFontWeight: false,
  addToCartButtonTypeLetterSpacing: false,
  addToCartButtonTypeLineHeight: false,
  addToCartButtonTypeTextDecoration: false,
  addToCartButtonTypeTextTransform: false,
  alignHeight: false,
  availableForSale: 'any',
  carousel: false,
  carouselDots: true,
  carouselInfinite: true,
  carouselNextArrow:
    "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-right' class='svg-inline--fa fa-angle-right fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'%3E%3C/path%3E%3C/svg%3E",
  carouselPrevArrow:
    "data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='angle-left' class='svg-inline--fa fa-angle-left fa-w-6' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 512'%3E%3Cpath fill='currentColor' d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'%3E%3C/path%3E%3C/svg%3E",
  carouselSlidesToScroll: 1,
  carouselSlidesToShow: 4,
  carouselSpeed: 1100,
  collection: false,
  componentType: 'products',
  connective: 'AND',
  createdAt: false,
  dataType: 'products',
  descriptionColor: '#111',
  descriptionFont: false,
  descriptionFontWeight: false,
  descriptionLength: false,
  descriptionSize: '16px',
  descriptionTypeFontFamily: false,
  descriptionTypeFontSize: false,
  descriptionTypeFontStyle: false,
  descriptionTypeFontWeight: false,
  descriptionTypeLetterSpacing: false,
  descriptionTypeLineHeight: false,
  descriptionTypeTextDecoration: false,
  descriptionTypeTextTransform: false,
  directCheckout: false,
  dropzoneLoadMore: false,
  dropzonePageSize: false,
  dropzonePagination: false,
  dropzoneProductBuyButton: false,
  dropzoneProductDescription: false,
  dropzoneProductGallery: false,
  dropzoneProductPricing: false,
  dropzoneProductTitle: false,
  excludes: [],
  fullWidth: false,
  gridColumnGap: '20px',
  hideQuantity: false,
  hideWrapper: false,
  htmlTemplate: false,
  imagesAlign: 'left',
  imagesSizingCrop: 'center',
  imagesSizingHeight: 400,
  imagesSizingScale: 0,
  imagesSizingToggle: true,
  imagesSizingWidth: 400,
  infiniteScroll: false,
  infiniteScrollOffset: -200,
  isSingleComponent: false,
  isSingular: false,
  itemsPerRow: 3,
  keepCommas: false,
  limit: false,
  linkTarget: '_self',
  linkTo: 'none',
  linkWithBuyButton: false,
  maxQuantity: false,
  minQuantity: 1,
  noResultsText: 'No products left to show',
  pageSize: 10,
  pagination: true,
  paginationLoadMore: true,
  paginationPageSize: false,
  postId: false,
  postMeta: false,
  pricingColor: false,
  pricingFont: false,
  pricingFontWeight: false,
  pricingTypeFontFamily: false,
  pricingTypeFontSize: false,
  pricingTypeFontStyle: false,
  pricingTypeFontWeight: false,
  pricingTypeLetterSpacing: false,
  pricingTypeLineHeight: false,
  pricingTypeTextDecoration: false,
  pricingTypeTextTransform: false,
  product: false,
  productId: false,
  productType: false,
  productsLinkTo: 'none',
  quantityLabelText: 'Quantity',
  query: 'title:super*',
  random: false,
  renderFromServer: false,
  reverse: false,
  showCompareAt: false,
  showFeaturedOnly: false,
  showImagesCarousel: false,
  showPriceRange: true,
  showPriceUnderVariantButton: false,
  showQuantityLabel: 'hello',
  showZoom: false,
  skipInitialRender: false,
  sortBy: 'TITLE',
  tag: false,
  thumbnailImagesSizingCrop: 'center',
  thumbnailImagesSizingHeight: 70,
  thumbnailImagesSizingScale: 0,
  thumbnailImagesSizingToggle: true,
  thumbnailImagesSizingWidth: 70,
  title: ['super*'],
  titleColor: '#111',
  titleFont: false,
  titleFontWeight: false,
  titleSize: '22px',
  titleTypeFontFamily: false,
  titleTypeFontSize: false,
  titleTypeFontStyle: false,
  titleTypeFontWeight: false,
  titleTypeLetterSpacing: false,
  titleTypeLineHeight: false,
  titleTypeTextDecoration: false,
  titleTypeTextTransform: false,
  updatedAt: false,
  variantButtonColor: '#000000',
  variantDropdownFont: false,
  variantDropdownFontSize: false,
  variantDropdownFontWeight: false,
  variantDropdownTextColor: '#FFFFFF',
  variantDropdownTypeFontFamily: false,
  variantDropdownTypeFontSize: false,
  variantDropdownTypeFontStyle: false,
  variantDropdownTypeFontWeight: false,
  variantDropdownTypeLetterSpacing: false,
  variantDropdownTypeLineHeight: false,
  variantDropdownTypeTextDecoration: false,
  variantDropdownTypeTextTransform: false,
  variantStyle: 'dropdown',
  variantsPrice: false,
  vendor: false,
};

const defaultProductPayload = [
  {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
    title: 'Super awesome dress shirt',
    availableForSale: true,
    createdAt: '2020-03-06T03:57:12Z',
    description: 'Aut eos ad labore. Eaque ut consectetur et consequatur sit est.',
    descriptionHtml:
      '<p><span style="text-decoration: underline;">Aut eos ad labore</span>. Eaque ut consectetur et consequatur sit est.</p>',
    handle: 'super-awesome-dress-shirt',
    onlineStoreUrl: 'https://scripts.blog/products/super-awesome-dress-shirt',
    productType: 'Beauty',
    publishedAt: '2021-06-11T15:44:25Z',
    updatedAt: '2021-06-11T15:44:25Z',
    vendor: 'Grant Group',
    images: [
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-vLuwT7BNIgg-unsplash.jpg?v=1601484601',
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: false,
        variableValues: null,
      },
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/rayul-_M6gy9oHgII-unsplash.jpg?v=1601484601',
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-IHZOJJr_R-8-unsplash.jpg?v=1601484601',
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/roberto-nickson-LWE8-zerUfA-unsplash.jpg?v=1601484597',
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/milad-shams-HpMrZyZwZNw-unsplash.jpg?v=1583467102',
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        altText: null,
        src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/mohamadreza-azhdari-YCGpdxqi94g-unsplash.jpg?v=1583467102',
        hasNextPage: false,
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
    ],
    options: [
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzU3OTUxOTgzMDQzMDQ=',
        name: 'Size',
        values: [
          {
            value: 'Small',
          },
          {
            value: 'Medium',
          },
          {
            value: 'Large',
          },
        ],
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzU3OTUxOTgzMzcwNzI=',
        name: 'Color',
        values: [
          {
            value: 'Red',
          },
          {
            value: 'Purple',
          },
          {
            value: 'Black',
          },
          {
            value: 'Pink',
          },
          {
            value: 'Green',
          },
          {
            value: 'Blue',
          },
        ],
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0T3B0aW9uLzU3OTUxOTgzNjk4NDA=',
        name: 'Material',
        values: [
          {
            value: 'Leather',
          },
          {
            value: 'Cotton',
          },
          {
            value: 'Silk',
          },
        ],
      },
    ],
    variants: [
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzA3MjU2MA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Small / Red / Leather',
        price: '38.25',
        priceV2: {
          amount: '38.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: 'aerodynamic-aluminum-wallet-small',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Small',
          },
          {
            name: 'Color',
            value: 'Red',
          },
          {
            name: 'Material',
            value: 'Leather',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-IHZOJJr_R-8-unsplash.jpg?v=1601484601',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzE5MTI3NTI=',
          altText: null,
        },
        hasNextPage: {
          value: true,
        },
        hasPreviousPage: false,
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzEwNTMyOA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Medium / Purple / Leather',
        price: '57.82',
        priceV2: {
          amount: '57.82',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: 'aerodynamic-aluminum-wallet-medium',
        weight: 0.3329,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Medium',
          },
          {
            name: 'Color',
            value: 'Purple',
          },
          {
            name: 'Material',
            value: 'Leather',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-vLuwT7BNIgg-unsplash.jpg?v=1601484601',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzE4Nzk5ODQ=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzEzODA5Ng==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Large / Red / Leather',
        price: '68.12',
        priceV2: {
          amount: '68.12',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '170.20',
        compareAtPriceV2: {
          amount: '170.2',
          currencyCode: 'USD',
        },
        sku: 'aerodynamic-aluminum-wallet-large',
        weight: 0.172,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Large',
          },
          {
            name: 'Color',
            value: 'Red',
          },
          {
            name: 'Material',
            value: 'Leather',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/mohamadreza-azhdari-YCGpdxqi94g-unsplash.jpg?v=1583467102',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzgzMzUyODA=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzE3MDg2NA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Small / Black / Leather',
        price: '38.25',
        priceV2: {
          amount: '38.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Small',
          },
          {
            name: 'Color',
            value: 'Black',
          },
          {
            name: 'Material',
            value: 'Leather',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/milad-shams-HpMrZyZwZNw-unsplash.jpg?v=1583467102',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5Mzg0MDA4MTY=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzIwMzYzMg==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Medium / Purple / Cotton',
        price: '38.25',
        priceV2: {
          amount: '38.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Medium',
          },
          {
            name: 'Color',
            value: 'Purple',
          },
          {
            name: 'Material',
            value: 'Cotton',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/rayul-_M6gy9oHgII-unsplash.jpg?v=1601484601',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzY2MzEzNDQ=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzIzNjQwMA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Large / Pink / Silk',
        price: '38.25',
        priceV2: {
          amount: '38.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Large',
          },
          {
            name: 'Color',
            value: 'Pink',
          },
          {
            name: 'Material',
            value: 'Silk',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/roberto-nickson-LWE8-zerUfA-unsplash.jpg?v=1601484597',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzUyMjIzMjA=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzI2OTE2OA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Medium / Green / Cotton',
        price: '1.00',
        priceV2: {
          amount: '1.0',
          currencyCode: 'USD',
        },
        availableForSale: false,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Medium',
          },
          {
            name: 'Color',
            value: 'Green',
          },
          {
            name: 'Material',
            value: 'Cotton',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-IHZOJJr_R-8-unsplash.jpg?v=1601484601',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzE5MTI3NTI=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc0MTYyNzMwMTkzNg==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Medium / Blue / Silk',
        price: '338.25',
        priceV2: {
          amount: '338.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Medium',
          },
          {
            name: 'Color',
            value: 'Blue',
          },
          {
            name: 'Material',
            value: 'Silk',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/eduardo-dutra-vLuwT7BNIgg-unsplash.jpg?v=1601484601',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzE4Nzk5ODQ=',
          altText: null,
        },

        hasNextPage: {
          value: true,
        },
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
      {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTQ0MjkwNDgwOTUyMA==',
        product: {
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ0NjQ5NzkwODMzMTI=',
          title: 'Super awesome dress shirt',
          vendor: 'Grant Group',
          productType: 'Beauty',
        },
        title: 'Large / Green / Leather',
        price: '8.25',
        priceV2: {
          amount: '8.25',
          currencyCode: 'USD',
        },
        availableForSale: true,
        compareAtPrice: '70.20',
        compareAtPriceV2: {
          amount: '70.2',
          currencyCode: 'USD',
        },
        sku: '',
        weight: 1.9004,
        selectedOptions: [
          {
            name: 'Size',
            value: 'Large',
          },
          {
            name: 'Color',
            value: 'Green',
          },
          {
            name: 'Material',
            value: 'Leather',
          },
        ],
        image: {
          src: 'https://cdn.shopify.com/s/files/1/0147/3639/2240/products/mohamadreza-azhdari-YCGpdxqi94g-unsplash.jpg?v=1583467102',
          id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTQzNzg5MzgzMzUyODA=',
          altText: null,
        },

        hasNextPage: false,
        hasPreviousPage: {
          value: true,
        },
        variableValues: null,
      },
    ],
    hasNextPage: false,
    hasPreviousPage: false,
    variableValues: null,
    type: {
      name: 'Product',
    },
  },
];

function defaultOptions(rootContainer, type = 'products') {
  return [
    {
      componentElement: rootContainer,
      componentId: 'd52adb8b',
      componentType: 'products',
      payloadSettings: type === 'products' ? defaultProductOptions : defaultProductOptions,
    },
  ];
}

async function render(
  children,
  renderOptions = { customSettings: false, customPayload: false, type: 'products' }
) {
  const promise = Promise.resolve();

  rtlRender(<div data-testid='testing'></div>);

  const rootContainer = screen.getByTestId('testing');

  const options = defaultOptions(rootContainer, renderOptions.type);

  if (renderOptions.customSettings) {
    var updatedSettings = assignIn(options[0].payloadSettings, renderOptions.customSettings);
    options[0].payloadSettings = updatedSettings;
  }

  const renderResult = rtlRender(
    <React.Suspense fallback='test loading'>
      <Shop>
        <Items options={options} payload={defaultProductPayload} isParentLoading={false}>
          {children}
        </Items>
      </Shop>
    </React.Suspense>
  );

  await act(() => promise);

  return { ...renderResult };
}

export * from '@testing-library/react';
export { defaultProductOptions, defaultProductPayload, defaultOptions, render, userEvent };

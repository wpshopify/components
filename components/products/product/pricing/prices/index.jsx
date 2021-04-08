/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductPricingContext } from '../_state/context';
import { ProductContext } from '../../_state/context';
import ProductPrice from '../price';

const ProductPricesCompareAt = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductPricesCompareAt-public' */ '../compare-at')
);

const { useContext } = wp.element;

function ProductPrices({ payloadSettings }) {
  const [productPricingState] = useContext(ProductPricingContext);
  const [productState] = useContext(ProductContext);
  const { Suspense } = wp.element;

  const ProductPricesCompareAtCSS = css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    position: relative;
    margin-bottom: ${payloadSettings.isSingleComponent ? '0px' : '35px'};

    + .wps-buy-button-wrapper > .wps-product-quantity-wrapper {
      margin-top: 1.7em;
    }
  `;

  return (
    <div className='wps-component-products-pricing' css={ProductPricesCompareAtCSS}>
      {productPricingState.showCompareAt ? (
        <Suspense fallback='Loading pricing ...'>
          <ProductPricesCompareAt
            selectedVariant={productState.selectedVariant}
            prices={productPricingState.prices}
            currencyCode={productPricingState.currencyCode}
            showPriceRange={productPricingState.showPriceRange}
            compareAt={productPricingState.showCompareAt}
            payloadSettings={payloadSettings}
          />
        </Suspense>
      ) : (
        <ProductPrice
          selectedVariant={productState.selectedVariant}
          compareAt={false}
          prices={productPricingState.prices}
          currencyCode={productPricingState.currencyCode}
          showPriceRange={productPricingState.showPriceRange}
          payloadSettings={payloadSettings}
        />
      )}
    </div>
  );
}

export { ProductPrices };

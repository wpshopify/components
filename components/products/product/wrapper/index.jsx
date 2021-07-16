/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useDebouncedCallback } from 'use-debounce';
import { useProductState, useProductDispatch } from '../_state/hooks';
import { isShowingComponent } from '../../../../common/components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../error-fallback';
import ProductCustomTemplate from '../template';
import isEqual from 'lodash/isEqual';

const ProductTitle = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductTitle-public' */ '../title')
);

const ProductPricing = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductPricing-public' */ '../pricing')
);

const ProductDescription = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductDescription-public' */ '../description')
);

const ProductImages = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductImages-public' */ '../images')
);

const ProductBuyButton = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButton-public' */ '../buy-button')
);

const ProductModal = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductModal-public' */ '../buy-button/modal')
);

function ProductWrapper({ payloadSettings }) {
  const { Suspense, useEffect } = wp.element;
  const productState = useProductState();
  const productDispatch = useProductDispatch();

  useEffect(() => {
    if (!isEqual(productState.payloadSettings, payloadSettings)) {
      productDispatch({ type: 'SET_PAYLOAD_SETTINGS', payload: payloadSettings });
    }
  }, [payloadSettings]);

  const ProductWrapperCSS = css`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;

    > div:nth-last-of-type(2) {
      flex: ${isAlignHeight() ? '1' : 'none'};
    }
  `;

  const debouncedMouseOver = useDebouncedCallback((value) => {
    if (!productState.isTouched) {
      productDispatch({ type: 'SET_IS_TOUCHED', payload: true });
    }
  }, 500);

  function onMouseOver() {
    debouncedMouseOver();
  }

  function isAlignHeight() {
    return wpshopify.settings.general.alignHeight || productState.payloadSettings.alignHeight;
  }
  
  return (
    <div
      css={ProductWrapperCSS}
      className='wps-item'
      onMouseOver={onMouseOver}
      aria-label='Product'
      data-wpshopify-is-available-for-sale={
        productState.payload.availableForSale ? productState.payload.availableForSale : 'false'
      }
      data-wpshopify-is-on-sale={
        productState.payload.isOnSale ? productState.payload.isOnSale : 'false'
      }>
      {productState.payloadSettings.htmlTemplate ||
      productState.payloadSettings.htmlTemplateData ? (
        <ProductCustomTemplate customHtmlData={productState.payloadSettings.htmlTemplateData} />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(productState.payloadSettings, 'images') && <ProductImages />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(productState.payloadSettings, 'title') && <ProductTitle />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(productState.payloadSettings, 'pricing') && <ProductPricing />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(productState.payloadSettings, 'description') && (
                <ProductDescription />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(productState.payloadSettings, 'buy-button') && (
                <ProductBuyButton />
              )}
            </Suspense>
          </ErrorBoundary>
        </>
      )}

      {productState.isModalOpen && wpshopify.misc.isPro && productState.payload && (
        <Suspense fallback={false}>
          <ProductModal />
        </Suspense>
      )}
    </div>
  );
}

export default ProductWrapper;

/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useProductState, useProductDispatch } from '../_state/hooks';
import { isShowingComponent } from '../../../../common/components';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../error-fallback';
import ProductCustomTemplate from '../template';

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

function ProductWrapper({ payloadSettings, componentId }) {
  const { Suspense } = wp.element;

  const productState = useProductState();
  const productDispatch = useProductDispatch();

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

  function onMouseOver() {
    if (!productState.isTouched) {
      productDispatch({ type: 'SET_IS_TOUCHED', payload: true });
    }
  }

  function isAlignHeight() {
    return wpshopify.settings.general.alignHeight || payloadSettings.alignHeight;
  }

  return (
    <div
      css={ProductWrapperCSS}
      className='wps-item'
      onMouseOver={onMouseOver}
      data-wpshopify-is-available-for-sale={
        productState.payload.availableForSale ? productState.payload.availableForSale : 'false'
      }
      data-wpshopify-is-on-sale={
        productState.payload.isOnSale ? productState.payload.isOnSale : 'false'
      }>
      {payloadSettings.htmlTemplate ? (
        <ProductCustomTemplate payloadSettings={payloadSettings} payload={productState.payload} />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(payloadSettings, 'images') && (
                <ProductImages payloadSettings={payloadSettings} payload={productState.payload} />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(payloadSettings, 'title') && (
                <ProductTitle payloadSettings={payloadSettings} payload={productState.payload} />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(payloadSettings, 'pricing') && (
                <ProductPricing payloadSettings={payloadSettings} payload={productState.payload} />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(payloadSettings, 'description') && (
                <ProductDescription
                  payloadSettings={payloadSettings}
                  payload={productState.payload}
                />
              )}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={false}>
              {isShowingComponent(payloadSettings, 'buy-button') && (
                <ProductBuyButton payloadSettings={payloadSettings} />
              )}
            </Suspense>
          </ErrorBoundary>
        </>
      )}

      {productState.isModalOpen && wpshopify.misc.isPro && (
        <Suspense fallback={false}>
          <ProductModal payloadSettings={payloadSettings} componentId={componentId} />
        </Suspense>
      )}
    </div>
  );
}

export { ProductWrapper };

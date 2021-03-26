/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ProductContext } from '../_state/context';
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

function ProductWrapper({ payloadSettings }) {
  const { useContext, Suspense } = wp.element;
  const [productState, productDispatch] = useContext(ProductContext);

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
        <ProductCustomTemplate />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback='Loading product images ...'>
              {isShowingComponent(payloadSettings, 'images') && <ProductImages />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback='Loading product title ...'>
              {isShowingComponent(payloadSettings, 'title') && <ProductTitle />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback='Loading product pricing ...'>
              {isShowingComponent(payloadSettings, 'pricing') && <ProductPricing />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback='Loading product description ...'>
              {isShowingComponent(payloadSettings, 'description') && <ProductDescription />}
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback='Loading product buy button ...'>
              {isShowingComponent(payloadSettings, 'buy-button') && <ProductBuyButton />}
            </Suspense>
          </ErrorBoundary>
        </>
      )}

      {productState.isModalOpen && wpshopify.misc.isPro && (
        <Suspense fallback='Loading product ...'>
          <ProductModal />
        </Suspense>
      )}
    </div>
  );
}

export { ProductWrapper };

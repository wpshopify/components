/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductContext } from '../_state/context'
import { isShowingComponent } from '../../../../common/components'
import { ErrorBoundary } from 'react-error-boundary'
import ProductTitle from '../title'
import ProductPricing from '../pricing'
import ProductDescription from '../description'
import ProductImages from '../images'
import ProductBuyButton from '../buy-button'
import ErrorFallback from '../../../error-fallback'
import ProductCustomTemplate from '../template'

function ProductWrapper({ payloadSettings }) {
  const { useContext } = wp.element
  const [productState, productDispatch] = useContext(ProductContext)

  const ProductWrapperCSS = css`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    min-width: 0;

    > div:nth-last-of-type(2) {
      flex: ${isAlignHeight() ? '1' : 'none'};
    }
  `

  function onMouseOver() {
    if (!productState.isTouched) {
      productDispatch({ type: 'SET_IS_TOUCHED', payload: true })
    }
  }

  function isAlignHeight() {
    return wpshopify.settings.general.alignHeight || payloadSettings.alignHeight
  }

  console.log('payloadSettings', payloadSettings)

  return (
    <div
      css={ProductWrapperCSS}
      className='wps-item'
      onMouseOver={onMouseOver}
      data-wpshopify-is-available-for-sale={productState.payload.availableForSale}>
      {payloadSettings.htmlTemplate ? (
        <ProductCustomTemplate />
      ) : (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isShowingComponent(payloadSettings, 'images') && <ProductImages />}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isShowingComponent(payloadSettings, 'title') && <ProductTitle />}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isShowingComponent(payloadSettings, 'pricing') && <ProductPricing />}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isShowingComponent(payloadSettings, 'description') && <ProductDescription />}
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {isShowingComponent(payloadSettings, 'buy-button') && <ProductBuyButton />}
          </ErrorBoundary>
        </>
      )}
    </div>
  )
}

export { ProductWrapper }

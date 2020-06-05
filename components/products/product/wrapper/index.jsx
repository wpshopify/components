import { ProductContext } from '../_state/context'
import { isShowingComponent } from '../../../../common/components'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { ProductTitle } from '../title'
import { ProductPricing } from '../pricing'
import { ProductDescription } from '../description'
import { ProductBuyButton } from '../buy-button'
import { ProductImages } from '../images'

const { useContext } = wp.element

function ProductWrapper({ payloadSettings }) {
  const [productState, productDispatch] = useContext(ProductContext)

  const ProductWrapperCSS = css`
    padding: 0;
    position: relative;
    margin: 0;
    display: ${isAlignHeight() ? 'flex' : 'block'};
    flex-direction: column;
    justify-content: space-between;
  `

  function onMouseOver() {
    if (!productState.isTouched) {
      productDispatch({ type: 'SET_IS_TOUCHED', payload: true })
    }
  }

  function isAlignHeight() {
    return wpshopify.settings.general.alignHeight || payloadSettings.alignHeight
  }

  return (
    <div
      css={ProductWrapperCSS}
      className={'wps-item'}
      onMouseOver={onMouseOver}
      data-wpshopify-is-available-for-sale={productState.payload.availableForSale}>
      {isShowingComponent(payloadSettings, 'images') && <ProductImages />}
      {isShowingComponent(payloadSettings, 'title') && (
        <ProductTitle payloadSettings={payloadSettings} />
      )}
      {isShowingComponent(payloadSettings, 'pricing') && <ProductPricing />}
      {isShowingComponent(payloadSettings, 'description') && <ProductDescription />}
      {isShowingComponent(payloadSettings, 'buy-button') && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }

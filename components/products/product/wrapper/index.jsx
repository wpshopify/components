import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { isShowingComponent } from '../../../../common/components'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import { ProductTitle } from '../title'
import { ProductPricing } from '../pricing'
import { ProductDescription } from '../description'
import { ProductBuyButton } from '../buy-button'
import { ProductImages } from '../images'

const { useContext } = wp.element

function ProductWrapper() {
  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)

  const ProductWrapperCSS = css`
    padding: 0;
    position: relative;
    margin: 0;
  `

  function onMouseOver() {
    if (!productState.isTouched) {
      productDispatch({ type: 'SET_IS_TOUCHED', payload: true })
    }
  }

  return (
    <div css={ProductWrapperCSS} className={'wps-item'} onMouseOver={onMouseOver}>
      {isShowingComponent(itemsState, 'images') && <ProductImages />}
      {isShowingComponent(itemsState, 'title') && <ProductTitle />}
      {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
      {isShowingComponent(itemsState, 'description') && <ProductDescription />}
      {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }

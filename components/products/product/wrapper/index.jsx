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

  const width =
    itemsState.payloadSettings.itemsPerRow === 1 || itemsState.payloadSettings.itemsPerRow === 2
      ? '360px'
      : 100 / itemsState.payloadSettings.itemsPerRow + '%'

  const ProductWrapperCSS = css`
    padding: 0 1em 1em 1em;
    position: relative;
    z-index: 1;
    flex: 0 0 ${width};
    margin-bottom: 2em;
  `

  return (
    <div css={ProductWrapperCSS} className={'wps-item'}>
      {isShowingComponent(itemsState, 'images') && <ProductImages />}
      {isShowingComponent(itemsState, 'title') && <ProductTitle />}
      {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
      {isShowingComponent(itemsState, 'description') && <ProductDescription />}
      {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }

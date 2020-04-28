import { ItemsContext } from '../../../items/_state/context'
import { isShowingComponent } from '../../../../common/components'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

const ProductTitle = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductTitle' */ '../title')
)
const ProductPricing = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductPricing' */ '../pricing')
)
const ProductDescription = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductDescription' */ '../description')
)
const ProductBuyButton = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButton' */ '../buy-button')
)
const ProductImages = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductImages' */ '../images')
)

function ProductWrapper() {
  console.log('<ProductWrapper> :: Render Start')

  const [itemsState] = useContext(ItemsContext)

  const width =
    itemsState.payloadSettings.itemsPerRow === 1 || itemsState.payloadSettings.itemsPerRow === 2
      ? '360px'
      : 100 / itemsState.payloadSettings.itemsPerRow + '%'

  const styles = css`
    padding: 0 1em 1em 1em;
    position: relative;
    z-index: 1;
    flex: 0 0 ${width};
  `

  return (
    <div css={styles} className={'wps-item'}>
      {isShowingComponent(itemsState, 'images') && <ProductImages />}
      {isShowingComponent(itemsState, 'title') && <ProductTitle />}
      {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
      {isShowingComponent(itemsState, 'description') && <ProductDescription />}
      {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }

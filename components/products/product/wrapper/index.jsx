import { ItemsContext } from '../../../items/_state/context'
import { ProductContext } from '../_state/context'
import { isShowingComponent } from '../../../../common/components'
import { itemWidthClass } from '../../../../common/utils'

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

function ProductWrapper({ isFirstItem }) {
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  return (
    <div
      className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item p-3`}
      data-is-first-item={isFirstItem}
      data-is-dropdown-open={productState.isDropdownOpen}>
      {isShowingComponent(itemsState, 'images') && <ProductImages />}
      {isShowingComponent(itemsState, 'title') && <ProductTitle />}
      {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
      {isShowingComponent(itemsState, 'description') && <ProductDescription />}
      {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
    </div>
  )
}

export { ProductWrapper }

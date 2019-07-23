import React, { useContext } from 'react'
import { ItemsContext } from '../../items/_state/context'
import { ProductProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

const ProductTitle = React.lazy(() => import(/* webpackChunkName: 'ProductTitle' */ './title'))
const ProductPricing = React.lazy(() => import(/* webpackChunkName: 'ProductPricing' */ './pricing'))
const ProductDescription = React.lazy(() => import(/* webpackChunkName: 'ProductDescription' */ './description'))
const ProductBuyButton = React.lazy(() => import(/* webpackChunkName: 'ProductBuyButton' */ './buy-button'))
const ProductImages = React.lazy(() => import(/* webpackChunkName: 'ProductImages' */ './images'))

function Product({ payload }) {
   const [itemsState] = useContext(ItemsContext)

   return (
      <div className={`${itemWidthClass(itemsState.componentOptions.itemsPerRow)} wps-item p-3`}>
         <ProductProvider payload={payload}>
            {isShowingComponent(itemsState, 'images') && <ProductImages />}
            {isShowingComponent(itemsState, 'title') && <ProductTitle />}
            {isShowingComponent(itemsState, 'pricing') && <ProductPricing />}
            {isShowingComponent(itemsState, 'description') && <ProductDescription />}
            {isShowingComponent(itemsState, 'buy-button') && <ProductBuyButton />}
         </ProductProvider>
      </div>
   )
}

export { Product }

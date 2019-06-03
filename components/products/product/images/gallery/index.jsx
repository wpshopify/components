import React, { useContext, useEffect } from 'react'
import has from 'lodash/has'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { ProductGalleryProvider } from './_state/provider.jsx'

function ProductGallery() {
   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)

   function hasManyImages() {
      if (!productState) {
         return false
      }

      return productState.hasManyImages
   }

   function isFeaturedOnly() {
      if (!has(itemsState.componentOptions, 'showFeaturedOnly')) {
         return false
      }

      return itemsState.componentOptions.showFeaturedOnly
   }

   return (
      <>
         <ProductGalleryProvider productState={productState}>
            {isFeaturedOnly() ? (
               <ProductFeaturedImage />
            ) : hasManyImages() ? (
               <>
                  <ProductFeaturedImage />
                  <ProductThumbnailImages />
               </>
            ) : (
               <ProductFeaturedImage />
            )}
         </ProductGalleryProvider>
      </>
   )
}

export { ProductGallery }

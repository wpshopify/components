import React, { useContext } from 'react'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { ProductGalleryProvider } from './_state/provider.jsx'
import has from 'lodash/has'

function ProductGallery() {
   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)

   function hasManyImages() {
      if (!productState) {
         return false
      }

      return productState.payload.images.length >= 2
   }

   // function getFeaturedImageFromProduct(product) {
   //    return product.images[0]
   // }

   function isFeaturedOnly() {
      if (!has(itemsState.componentOptions, 'showFeaturedOnly')) {
         return false
      }

      return itemsState.componentOptions.showFeaturedOnly
   }

   // useEffect(() => {
   //    galleryDispatch({
   //       type: 'SET_FEAT_IMAGE',
   //       payload: getFeaturedImageFromProduct(productState.payload)
   //    })
   // }, [])

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

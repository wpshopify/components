import React, { useContext } from 'react'
import { ProductContext } from '../../_state/context'
import { ProductsContext } from '../../../_state/context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { ProductGalleryProvider } from './_state/provider.jsx'

function ProductGallery() {
   const [productsState] = useContext(ProductsContext)
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
      return productsState.componentOptions.showFeaturedOnly
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

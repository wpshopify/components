import React, { useContext, useEffect, useReducer } from 'react'
import { ProductContext } from '../../_state/context'
import { ProductsContext } from '../../../_state/context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { ProductGalleryContext } from './context'
import { getProductGalleryInitialState } from './initial-state'
import { ProductGalleryReducer } from './reducer'

function ProductGallery() {
   const { productsState } = useContext(ProductsContext)
   const { productState } = useContext(ProductContext)
   const [galleryState, galleryDispatch] = useReducer(ProductGalleryReducer, getProductGalleryInitialState())

   function hasManyImages() {
      if (!productState) {
         return false
      }
      console.log('productState', productState.payload)

      return productState.payload.images.length >= 2
   }

   function getFeaturedImageFromProduct(product) {
      return product.images[0]
   }

   function isFeaturedOnly() {
      console.log('productState isFeaturedOnly', productState)

      return productsState.componentOptions.showFeaturedOnly
   }

   useEffect(() => {
      galleryDispatch({
         type: 'SET_FEAT_IMAGE',
         payload: getFeaturedImageFromProduct(productState.payload)
      })
   }, [])

   return (
      <>
         <ProductGalleryContext.Provider
            value={{
               galleryState: galleryState,
               galleryDispatch: galleryDispatch
            }}>
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
         </ProductGalleryContext.Provider>
      </>
   )
}

export { ProductGallery }

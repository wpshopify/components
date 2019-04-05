import React, { useContext, useEffect, useReducer } from 'react'
import { ProductContext } from '../../context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { ProductGalleryContext } from './context'
import { getProductGalleryInitialState } from './initial-state'
import { ProductGalleryReducer } from './reducer'

function ProductGallery() {
   const { productState } = useContext(ProductContext)
   const [galleryState, galleryDispatch] = useReducer(ProductGalleryReducer, getProductGalleryInitialState())

   function hasManyImages() {
      console.log('hiihii')

      return productState.product.images.length >= 2
   }

   function getFeaturedImageFromProduct(product) {
      return product.images[0]
   }

   function isFeaturedOnly() {
      return productState.componentOptions.show_featured_only
   }

   useEffect(() => {
      galleryDispatch({
         type: 'SET_FEAT_IMAGE',
         payload: getFeaturedImageFromProduct(productState.product)
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

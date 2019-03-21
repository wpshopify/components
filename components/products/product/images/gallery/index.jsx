import React, { useContext, useEffect, useState, useRef, useReducer } from 'react'
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
      return productState.product.images.length >= 2
   }

   function getFeaturedImageFromProduct(product) {
      return product.images[0]
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
            <div className='wps-gallery-featured-wrapper'>
               <ProductFeaturedImage />
            </div>
            {hasManyImages() ? (
               <div className='wps-thumbnails-wrapper'>
                  <ProductThumbnailImages />
               </div>
            ) : (
               ''
            )}
         </ProductGalleryContext.Provider>
      </>
   )
}

export { ProductGallery }

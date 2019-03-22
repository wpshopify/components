import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductContext } from '../../context'
import { ShopContext } from '../../../../shop/context'

import { ProductGalleryContext } from '../gallery/context'
import { ProductImage } from '../image'
import Drift from 'drift-zoom'

function getFeaturedImageFromProduct(product) {
   return product.images[0]
}

function getVariantImage(variant) {
   return variant.image
}

function destroyDrift(drift) {
   drift.destroy()
   window.Drift = null
   drift = null
}

function ProductFeaturedImage() {
   const paneElement = useRef()
   const isFirstRender = useRef(true)
   const { productState } = useContext(ProductContext)
   const { shopState } = useContext(ShopContext)

   const { galleryState } = useContext(ProductGalleryContext)

   const [featImageElemnent, setFeatImageElemnent] = useState(false)
   const [featImage, setFeatImage] = useState(false)

   function driftOptions() {
      return {
         paneContainer: paneElement.current,
         inlinePane: false
      }
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (galleryState.featImage) {
         setFeatImage(galleryState.featImage)
      }
   }, [galleryState.featImage])

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      console.log('shopState.settings', shopState.settings)

      if (galleryState.featImage && galleryState.featImageElement && shopState.settings.productsImagesShowZoom) {
         console.log('Both feat image and feat image element are properly set, initing Drift ...')
         console.log('galleryState.featImageElement', galleryState.featImageElement)

         var drift = new Drift(galleryState.featImageElement, driftOptions())

         return () => {
            console.log('Destroying Drift ...')
            destroyDrift(drift)
         }
      }
   }, [galleryState.featImageElement])

   useEffect(() => {
      console.log('productState.selectedVariant', productState.selectedVariant)

      if (productState.selectedVariant) {
         setFeatImage(getVariantImage(productState.selectedVariant))
      }
   }, [productState.selectedVariant])

   return galleryState.featImage ? (
      <div className='wps-component wps-component-products-images-featured' data-wps-is-component-wrapper data-wps-post-id='' data-wps-ignore-sync='1' ref={paneElement}>
         <div className='wps-product-image-wrapper'>
            <ProductImage isFeatured={true} image={featImage} />
         </div>
      </div>
   ) : (
      <span>No image found</span>
   )
}

export { ProductFeaturedImage }

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
   console.log('ProductGalleryContext', ProductGalleryContext)

   const { galleryState } = useContext(ProductGalleryContext)

   console.log('............................... ProductFeaturedImage')

   const [featImageElemnent, setFeatImageElemnent] = useState(false)
   const [featImage, setFeatImage] = useState(false)

   function driftOptions() {
      return {
         paneContainer: paneElement.current,
         inlinePane: false
      }
   }

   function showZoom() {
      return productState.componentOptions.show_zoom
   }

   function hasFeatImage() {
      return galleryState.featImage && galleryState.featImageElement
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

      if (hasFeatImage() && showZoom()) {
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
      if (productState.selectedVariant) {
         setFeatImage(getVariantImage(productState.selectedVariant))
      }
   }, [productState.selectedVariant])

   return (
      <div className='wps-gallery-featured-wrapper' ref={paneElement}>
         <div className='wps-product-image-wrapper'>
            {galleryState.featImage ? <ProductImage isFeatured={true} image={featImage} /> : <ProductImage isFeatured={true} image={galleryState.featImagePlaceholder} />}
         </div>
      </div>
   )
}

export { ProductFeaturedImage }

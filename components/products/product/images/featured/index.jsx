import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductGalleryContext } from '../gallery/_state/context'
import { ProductImage } from '../image'
import Drift from 'drift-zoom'

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

   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)
   const [galleryState] = useContext(ProductGalleryContext)
   const [featImage, setFeatImage] = useState(galleryState.featImage)

   function driftOptions() {
      return {
         paneContainer: paneElement.current,
         inlineOffsetX: -80
      }
   }

   function showZoom() {
      if (itemsState.componentOptions.showZoom) {
         return true
      }

      return shopState.settings.productsImagesShowZoom
   }

   function hasFeatImage() {
      return featImage && galleryState.featImageElement
   }

   useEffect(() => {
      console.log('galleryState.featImage')
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (galleryState.featImage) {
         setFeatImage(galleryState.featImage)
      }
   }, [galleryState.featImage])

   useEffect(() => {
      console.log('galleryState.featImageElement')
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (hasFeatImage() && showZoom()) {
         var drift = new Drift(galleryState.featImageElement, driftOptions())

         return () => {
            destroyDrift(drift)
         }
      }
   }, [galleryState.featImageElement])

   useEffect(() => {
      console.log('productState.selectedVariant')

      if (productState.selectedVariant) {
         setFeatImage(getVariantImage(productState.selectedVariant))
      }
   }, [productState.selectedVariant])

   return (
      <div className='wps-gallery-featured-wrapper' ref={paneElement}>
         <div className='wps-product-image-wrapper'>
            {featImage ? <ProductImage isFeatured={true} image={featImage} /> : <ProductImage isFeatured={true} image={galleryState.featImagePlaceholder} />}
         </div>
      </div>
   )
}

export { ProductFeaturedImage }

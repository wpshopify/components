import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'
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

   const [itemsState] = useContext(ItemsContext)
   const [productState] = useContext(ProductContext)
   const [galleryState] = useContext(ProductGalleryContext)

   // const [featImageElemnent, setFeatImageElemnent] = useState(false)
   const [featImage, setFeatImage] = useState(false)

   function driftOptions() {
      return {
         paneContainer: paneElement.current,
         inlinePane: false
      }
   }

   function showZoom() {
      return itemsState.componentOptions.showZoom
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
            {galleryState.featImage ? <ProductImage isFeatured={true} image={galleryState.featImage} /> : <ProductImage isFeatured={true} image={galleryState.featImagePlaceholder} />}
         </div>
      </div>
   )
}

export { ProductFeaturedImage }

import React, { useContext, useEffect, useState, useRef } from 'react'
import { ProductGallery } from '../index'
import { ProductGalleryProvider } from '../_state/provider.jsx'

function ProductGalleryWrapper({ productState }) {
   return (
      <>
         <ProductGalleryProvider productState={productState}>
            <ProductGallery />
         </ProductGalleryProvider>
      </>
   )
}

export { ProductGalleryWrapper }

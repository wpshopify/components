import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../shop/_state/context'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { findPortalElement } from '../../../../common/utils'

function CollectionImage() {
   const [shopState] = useContext(ShopContext)
   const [collectionState] = useContext(CollectionContext)
   const [itemsState] = useContext(ItemsContext)
   const [imageSrc, setImageSrc] = useState(collectionState.payload.image.src)

   useEffect(() => {
      if (!imageSrc) {
         return
      }

      if (shopState.settings.collectionsImagesSizingToggle) {
         setImageSrc(
            addCustomSizingToImageUrl({
               src: collectionState.payload.image.src,
               width: shopState.settings.collectionsImagesSizingWidth,
               height: shopState.settings.collectionsImagesSizingHeight,
               crop: shopState.settings.collectionsImagesSizingCrop,
               scale: shopState.settings.collectionsImagesSizingScale
            })
         )
      }
   }, [])

   return usePortal(
      <div className='wps-component wps-component-collection-image' data-wps-component-order='0'>
         <img
            itemProp='image'
            src={imageSrc}
            className='wps-product-image'
            alt={collectionState.payload.image ? collectionState.payload.image.altText : ''}
            data-wps-is-ready={shopState.isShopReady ? '1' : '0'}
         />
      </div>,
      findPortalElement(collectionState.element, itemsState.componentOptions.dropzoneCollectionImage)
   )
}

export { CollectionImage }

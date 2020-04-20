import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { findPortalElement } from '../../../../common/utils'
import { Link } from '../../../link'

const { useContext, useState, useEffect } = wp.element

function CollectionImage({ isShopReady, shopSettings, shopInfo }) {
  const [collectionState] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)
  const [imageSrc, setImageSrc] = useState(() =>
    collectionState.payload.image ? collectionState.payload.image.src : false
  )

  useEffect(() => {
    if (!imageSrc) {
      return
    }

    if (shopSettings.collectionsImagesSizingToggle) {
      setImageSrc(
        addCustomSizingToImageUrl({
          src: collectionState.payload.image.src,
          width: shopSettings.collectionsImagesSizingWidth,
          height: shopSettings.collectionsImagesSizingHeight,
          crop: shopSettings.collectionsImagesSizingCrop,
          scale: shopSettings.collectionsImagesSizingScale,
        })
      )
    }
  }, [])

  return usePortal(
    imageSrc && (
      <div className='wps-component wps-component-collection-image' data-wps-component-order='0'>
        <Link
          type='collections'
          shop={shopInfo}
          payload={collectionState.payload}
          linkTo={itemsState.payloadSettings.linkTo}
          target={itemsState.payloadSettings.linkTarget}>
          <img
            itemProp='image'
            src={imageSrc}
            className='wps-product-image lazyload'
            alt={collectionState.payload.image ? collectionState.payload.image.altText : ''}
            data-wps-is-ready={isShopReady ? '1' : '0'}
          />
        </Link>
      </div>
    ),
    findPortalElement(collectionState.element, itemsState.payloadSettings.dropzoneCollectionImage)
  )
}

export { CollectionImage }

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { findPortalElement } from '../../../../common/utils'
import { Link } from '../../../link'

const { useContext, useState, useEffect } = wp.element

function CollectionImage() {
  const [collectionState] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)
  const [imageSrc, setImageSrc] = useState(() =>
    collectionState.payload.image ? collectionState.payload.image.src : false
  )

  useEffect(() => {
    if (!imageSrc) {
      return
    }

    if (wpshopify.settings.general.collectionsImagesSizingToggle) {
      setImageSrc(
        addCustomSizingToImageUrl({
          src: collectionState.payload.image.src,
          width: wpshopify.settings.general.collectionsImagesSizingWidth,
          height: wpshopify.settings.general.collectionsImagesSizingHeight,
          crop: wpshopify.settings.general.collectionsImagesSizingCrop,
          scale: wpshopify.settings.general.collectionsImagesSizingScale,
        })
      )
    }
  }, [])

  const CollectionImageCSS = css`
    margin-bottom: 20px;
    max-width: 400px;
  `

  return usePortal(
    imageSrc && (
      <div className='wps-component wps-component-collection-image' css={CollectionImageCSS}>
        <Link
          type='collections'
          payload={collectionState.payload}
          linkTo={itemsState.payloadSettings.linkTo}
          target={itemsState.payloadSettings.linkTarget}>
          <img
            itemProp='image'
            src={imageSrc}
            className='wps-product-image lazyload'
            alt={collectionState.payload.image ? collectionState.payload.image.altText : ''}
          />
        </Link>
      </div>
    ),
    findPortalElement(collectionState.element, itemsState.payloadSettings.dropzoneCollectionImage)
  )
}

export { CollectionImage }

import has from 'lodash/has'
import { ProductContext } from '../../_state/context'
import { ProductGalleryContext } from './_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductThumbnailImages } from '../thumbnails'
import { ProductFeaturedImage } from '../featured'
import { hasLink } from '../../../../../common/settings'

const { useEffect, useContext, useRef } = wp.element

function ProductGallery() {
  console.log('<ProductGallery> :: Render Start')
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)
  const isFirstRender = useRef(true)
  const product = productState.payload

  function hasManyImages() {
    if (!productState) {
      return false
    }

    return productState.hasManyImages
  }

  function isFeaturedOnly() {
    if (hasLink(itemsState)) {
      return true
    }

    if (!has(itemsState.payloadSettings, 'showFeaturedOnly')) {
      return false
    }

    return itemsState.payloadSettings.showFeaturedOnly
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (productState.selectedVariant) {
      galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: productState.selectedVariant.image })
    } else {
      galleryDispatch({
        type: 'SET_FEAT_IMAGE',
        payload:
          productState.payload && productState.payload.images
            ? productState.payload.images[0]
            : false,
      })
    }
  }, [productState.selectedVariant])

  return (
    <>
      {isFeaturedOnly() ? (
        <ProductFeaturedImage />
      ) : hasManyImages() ? (
        <>
          <ProductFeaturedImage />
          <ProductThumbnailImages product={product} />
        </>
      ) : (
        <ProductFeaturedImage />
      )}
    </>
  )
}

export { ProductGallery }

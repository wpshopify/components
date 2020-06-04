import ProductImage from '../image'
import { ProductGalleryContext } from '../gallery/_state/context'

const { useEffect, useContext, useState } = wp.element

function ProductThumbnailImage({ image, payloadSettings }) {
  const [galleryState, galleryDispatch] = useContext(ProductGalleryContext)

  const [isActive, setIsActive] = useState(() => false)

  useEffect(
    function () {
      if (!checkIsActive(galleryState.featImage.src)) {
        setIsActive(false)
      } else {
        setIsActive(true)
      }
    },
    [galleryState.featImage]
  )

  function checkIsActive(featImageSrc) {
    return featImageSrc === image.src
  }

  function onClick() {
    galleryDispatch({ type: 'SET_FEAT_IMAGE', payload: image })
  }

  return (
    <div
      className='wps-component wps-component-products-images-thumbnail'
      onClick={onClick}
      data-wps-is-active={isActive}>
      <ProductImage payloadSettings={payloadSettings} isFeatured={false} image={image} />
    </div>
  )
}

export default wp.element.memo(ProductThumbnailImage)

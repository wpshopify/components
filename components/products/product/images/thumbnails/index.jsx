import { ProductThumbnailImage } from '../thumbnail'
import { doFeaturedSizing } from '../../../../../common/images'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'
const { useState } = wp.element

const ProductThumbnailImages = wp.element.memo(function ProductThumbnailImages({ product }) {
  console.log('<ProductThumbnailImages> :: Render Start')

  const [didPreload, setDidPreload] = useState(false)

  function hasImages() {
    return product && !isEmpty(product.images)
  }

  function onMouseEnter() {
    if (!didPreload) {
      product.images.map((img) => (new Image().src = doFeaturedSizing(img.src)))

      setDidPreload(true)
    }
  }

  return (
    hasImages() && (
      <div className='wps-thumbnails-wrapper' onMouseEnter={onMouseEnter}>
        {product.images.map((image) => (
          <ProductThumbnailImage key={uuidv4()} image={image} />
        ))}
      </div>
    )
  )
})

export { ProductThumbnailImages }

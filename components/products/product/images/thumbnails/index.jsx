import { ProductThumbnailImage } from '../thumbnail'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'

const ProductThumbnailImages = wp.element.memo(function ProductThumbnailImages({ product }) {
  function hasImages() {
    return product && !isEmpty(product.images)
  }

  return (
    hasImages() && (
      <div className='wps-thumbnails-wrapper'>
        {product.images.map((image) => (
          <ProductThumbnailImage key={uuidv4()} image={image} />
        ))}
      </div>
    )
  )
})

export { ProductThumbnailImages }

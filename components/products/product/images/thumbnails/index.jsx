import { ShopContext } from '../../../../shop/_state/context'
import { ProductThumbnailImage } from '../thumbnail'
import { doFeaturedSizing } from '../../../../../common/images'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'
const { useContext } = wp.element

const ProductThumbnailImages = wp.element.memo(function ProductThumbnailImages({ product }) {
  const [shopState] = useContext(ShopContext)

  function hasImages() {
    return product && !isEmpty(product.images)
  }

  function onMouseEnter() {
    console.log('preload all', product.images)
    product.images.map((img) => (new Image().src = doFeaturedSizing(img.src, shopState)))
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

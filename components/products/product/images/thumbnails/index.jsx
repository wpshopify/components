import ProductThumbnailImage from '../thumbnail'
import { doFeaturedSizing } from '../../../../../common/images'
import { v4 as uuidv4 } from 'uuid'
import isEmpty from 'lodash/isEmpty'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductThumbnailImages({ product, payloadSettings }) {
  const { useState } = wp.element
  const [didPreload, setDidPreload] = useState(false)

  const thumbnailsWrapperCSS = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 15px;
    grid-row-gap: 0px;
    margin-top: 12px;
  `

  function hasImages() {
    return product && !isEmpty(product.images)
  }

  function onMouseEnter() {
    if (!didPreload) {
      product.images.map((img) => (new Image().src = doFeaturedSizing(img.src)))

      setDidPreload(true)
    }
  }

  return hasImages() ? (
    <div className='wps-thumbnails-wrapper' css={thumbnailsWrapperCSS} onMouseEnter={onMouseEnter}>
      {product.images.map((image) => (
        <ProductThumbnailImage key={uuidv4()} image={image} payloadSettings={payloadSettings} />
      ))}
    </div>
  ) : null
}

export default wp.element.memo(ProductThumbnailImages)

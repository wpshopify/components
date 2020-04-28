import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function ProductDescription() {
  const [productState] = useContext(ProductContext)
  const [itemsState] = useContext(ItemsContext)

  const fontSize = css`
    font-size: ${itemsState.payloadSettings.descriptionSize};
  `

  const fontColor = css`
    color: ${itemsState.payloadSettings.descriptionColor};
  `

  function maybeTruncateDescription() {
    if (!itemsState.payloadSettings.descriptionLength) {
      return productState.payload.descriptionHtml
    } else {
      return (
        productState.payload.descriptionHtml.substring(
          0,
          itemsState.payloadSettings.descriptionLength
        ) + ' ...'
      )
    }
  }

  return usePortal(
    <div
      css={[fontSize, fontColor]}
      itemProp='description'
      className='wps-products-description'
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductDescription)
  )
}

export default ProductDescription

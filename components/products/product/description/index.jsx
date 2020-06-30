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

  const ProductDescriptionCSS = css`
    color: ${itemsState.payloadSettings.descriptionColor};
    font-size: ${itemsState.payloadSettings.descriptionSize};
    margin-bottom: 20px;
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
      css={ProductDescriptionCSS}
      className='wps-component-products-description'
      itemProp='description'
      dangerouslySetInnerHTML={{ __html: maybeTruncateDescription() }}
    />,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductDescription)
  )
}

export { ProductDescription }

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook } from '../../../../../../common/utils'
const { __ } = wp.i18n

function ProductVariantMissingSelection() {
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `

  return (
    <p css={selectStyles}>
      <FilterHook name='product.missingSelection.text'>
        {__('Please select a variation', wpshopify.misc.textdomain)}
      </FilterHook>
    </p>
  )
}

export default ProductVariantMissingSelection

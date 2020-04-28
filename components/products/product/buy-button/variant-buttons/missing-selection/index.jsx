/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FilterHook, __t } from '../../../../../../common/utils'

function ProductVariantMissingSelection() {
  const selectStyles = css`
    margin-top: 6px;
    color: red;
  `

  return (
    <p css={selectStyles}>
      <FilterHook name='product.missingSelection.text'>
        {__t('Please select a variation')}
      </FilterHook>
    </p>
  )
}

export default ProductVariantMissingSelection

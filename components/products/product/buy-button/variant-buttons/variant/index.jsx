/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductBuyButtonContext } from '../../_state/context'
import { createObj, isPairMatch } from '../../../../../../common/utils'
import isEmpty from 'lodash/isEmpty'

function ProductVariantButtonValue({ variant, onSelection, isAvailableToSelect }) {
  const { useContext } = wp.element

  const [buyButtonState] = useContext(ProductBuyButtonContext)
  const variantObj = createObj(variant.name, variant.value)
  const isSelected = isPairMatch(buyButtonState.selectedOptions, variantObj)
  const isSelectable = isEmpty(buyButtonState.selectedOptions) || isAvailableToSelect

  const border = isSelected ? '#415aff' : 'black'
  const color = isSelected ? 'white' : 'black'
  const backgroundColor = isSelected ? '#415aff' : 'transparent'
  const opacity = isSelectable ? 1 : 0.4
  const cursor = 'pointer'

  function addColorSwatches() {
    wp.hooks.addFilter('product.variant.styles', 'wpshopify', function(
      defaultCustomStyles,
      variant,
      isSelected,
      isSelectable
    ) {
      if (variant.name.toLowerCase() === 'color') {
        return (
          defaultCustomStyles +
          `
            background-color: ${variant.value};
            text-indent: 100%;
            white-space: nowrap;
            overflow: hidden;
            width: 40px;
            height: 40px;
            font-size: 0;
            opacity: ${isSelectable ? 1 : 0.2};
            border-radius: 50%;
            border: ${isSelected ? '1px solid ' + variant.value : 'none'};
            box-shadow: ${isSelected ? 'inset 0 0 0px 4px' : 'none'};
            transition: all ease 0.15s;
         `
        )
      }
    })
  }

  addColorSwatches()

  const customStyles = wp.hooks.applyFilters(
    'product.variant.styles',
    '',
    variant,
    isSelected,
    isSelectable
  )
  var defaultStyles = css`
    margin: 0 10px 10px 0;
    outline: none;
    border: 1px solid ${border};
    font-size: 1em;
    padding: 10px;
    border-radius: 5px;
    opacity: ${opacity};
    color: ${color};
    background-color: ${backgroundColor};

    &:hover {
      cursor: ${cursor};
    }

    ${customStyles}
  `

  return (
    <button
      css={defaultStyles}
      onClick={onSelection}
      data-is-variant-selected={isSelected}
      data-is-available={isSelectable}>
      {variant.value}
    </button>
  )
}

export default ProductVariantButtonValue

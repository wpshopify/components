/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { createObj, isPairMatch } from '../../../../../../common/utils'

function ProductVariantButtonValue({ variant, onSelection, selectedOptions, isAvailableToSelect }) {
  console.log('<ProductVariantButtonValue> :: Render Start', selectedOptions)
  const variantObj = createObj(variant.name, variant.value)
  const isSelected = isPairMatch(selectedOptions, variantObj)
  const isColorOption = variant.name.toLowerCase() === 'color'
  const border = isSelected ? '#415aff' : 'black'
  const color = isSelected ? 'white' : 'black'
  const backgroundColor = isSelected ? '#415aff' : 'transparent'
  const opacity = isSelected || isAvailableToSelect ? 1 : 0.4

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
      cursor: ${!isSelected ? 'pointer' : 'auto'};
      opacity: ${!isSelected ? 0.6 : 1};
    }
  `

  if (isColorOption) {
    defaultStyles = css`
      ${wp.hooks.applyFilters(
        'product.variant.styles',
        defaultStyles,
        variant,
        isSelected,
        isAvailableToSelect
      )}
    `
  }

  return (
    <ProductVariantButtonValueButton
      defaultStyles={defaultStyles}
      onSelection={onSelection}
      isSelected={isSelected}
      isAvailableToSelect={isAvailableToSelect}
      variantValue={variant.value}
    />
  )
}

function ProductVariantButtonValueButton({
  defaultStyles,
  onSelection,
  isSelected,
  isAvailableToSelect,
  variantValue,
}) {
  console.log('<ProductVariantButtonValueButton> :: Render Start')
  return (
    <button
      css={defaultStyles}
      onClick={onSelection}
      data-is-variant-selected={isSelected}
      data-is-available={isAvailableToSelect}>
      {variantValue}
    </button>
  )
}

export default wp.element.memo(ProductVariantButtonValue)

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { createObj, isPairMatch } from '../../../../../../common/utils'

function ProductVariantButtonValue({ variant, onSelection, selectedOptions, isAvailableToSelect }) {
  const variantObj = createObj(variant.name, variant.value)
  const isSelected = isPairMatch(selectedOptions, variantObj)
  const border = isSelected ? '#415aff' : 'black'
  const color = isSelected ? 'white' : 'black'
  const backgroundColor = isSelected ? '#415aff' : 'transparent'
  const opacity = isSelected || isAvailableToSelect ? 1 : 0.4

  const colorSwatchNames = wp.hooks.applyFilters('product.variant.styles.colorSwatch.names', [
    'color',
  ])

  const defaultVariantStyles = `margin: 0 10px 10px 0;
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
    }`

  function maybeColorSwatches(variant, defaultCustomStyles) {
    if (!colorSwatchNames.map((v) => v.toLowerCase()).includes(variant.name.toLowerCase())) {
      return defaultCustomStyles
    }

    let variantValue = wp.hooks.applyFilters(
      'product.variant.styles.colorSwatch.value',
      variant.value
    )

    if (variantValue === 'white' || variantValue === 'White') {
      var border = isSelected ? '3px solid #333' : '1px solid #333'
    } else {
      var border = isSelected ? '1px solid ' + variantValue : 'none'
    }

    return `
         margin: 0 10px 10px 0;
         outline: none;
         padding: 10px;
         background-color: ${variantValue};
         text-indent: 150%;
         white-space: nowrap;
         overflow: hidden;
         width: 40px;
         height: 40px;
         font-size: 0;
         opacity: ${isAvailableToSelect ? 1 : 0.1};
         border-radius: 50%;
         border: ${border};
         box-shadow: ${isSelected ? 'inset 0 0 0px 4px white' : 'none'};
         transition: 100ms transform ease;
         line-height: 1;

         &:hover {
            transform: scale(1.2);
            cursor: ${!isSelected ? 'pointer' : 'auto'};
            opacity: 1 !important;
         }      
      `
  }

  var defaultStyles = css`
    ${wp.hooks.applyFilters(
      'product.variant.styles',
      maybeColorSwatches(variant, defaultVariantStyles),
      variant,
      isSelected,
      isAvailableToSelect
    )}
  `

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

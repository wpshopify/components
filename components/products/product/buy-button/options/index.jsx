import { ProductOption } from '../option'
import { VariantButtons } from '../variant-buttons'
import { ProductBuyButtonContext } from '../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import filter from 'lodash/filter'
import flatMap from 'lodash/flatMap'
import { containerFluidCSS } from '../../../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function onlyAvailableVariantsOptions(variants) {
  return groupBy(
    flatMap(variants, variant => variant.selectedOptions),
    'name'
  )
}

function onlyUniqueOptionValues(optionValues) {
  return uniqBy(optionValues, 'value').filter(item => item.value)
}

function formatAvailableOptions(availOptions) {
  return map(availOptions, (optionValues, optionName) => {
    return {
      name: optionName,
      values: onlyUniqueOptionValues(optionValues)
    }
  })
}

function filterOnlyAvailableVariants(variants) {
  return filter(variants, function(v) {
    return v.availableForSale
  })
}

function onlyAvailableOptionsFromVariants(variants) {
  if (!variants.length) {
    return false
  }

  return formatAvailableOptions(onlyAvailableVariantsOptions(filterOnlyAvailableVariants(variants)))
}

function variantHasDropdown(itemsState) {
  return itemsState.payloadSettings.variantStyle === 'dropdown'
}

function VariantDropdown({ options }) {
  return (
    options && (
      <div
        className='wps-component wps-component-products-options'
        css={containerFluidCSS}
        data-wps-is-component-wrapper>
        {options.map(option => (
          <ProductOption key={option.name} option={option} />
        ))}
      </div>
    )
  )
}

/*

If this component is rendered, that means at least one variant is available for purchase

*/
function ProductOptions() {
  const [itemsState] = useContext(ItemsContext)
  const [buyButtonState] = useContext(ProductBuyButtonContext)

  const options = onlyAvailableOptionsFromVariants(buyButtonState.product.variants)

  return variantHasDropdown(itemsState) ? (
    <VariantDropdown options={options} />
  ) : (
    <VariantButtons options={options} />
  )
}

export { ProductOptions }

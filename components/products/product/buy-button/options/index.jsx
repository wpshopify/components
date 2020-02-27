import { ProductOption } from '../option'
import { VariantButtons } from '../variant-buttons'
import { ProductBuyButtonContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ItemsContext } from '../../../../items/_state/context'

import size from 'lodash/size'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import filter from 'lodash/filter'
import flatMap from 'lodash/flatMap'
import { containerFluidCSS } from '../../../../../common/css'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useEffect, useContext, useRef } = wp.element

function allOptionsSelectedMatch(onlySelectedOptions, product) {
  return size(onlySelectedOptions) === product.options.length
}

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
  console.log('itemsState.payloadSettings.variantStyle', itemsState.payloadSettings.variantStyle)

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
  const isFirstRender = useRef(true)
  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)

  const options = onlyAvailableOptionsFromVariants(buyButtonState.product.variants)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (allOptionsSelectedMatch(buyButtonState.selectedOptions, buyButtonState.product)) {
      buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: true })

      productDispatch({
        type: 'SET_SELECTED_VARIANT',
        payload: {
          product: buyButtonState.product,
          selectedOptions: buyButtonState.selectedOptions
        }
      })

      wp.hooks.doAction('before.product.addToCart', buyButtonState)
    } else {
      buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
    }
  }, [buyButtonState.selectedOptions])

  return variantHasDropdown(itemsState) ? (
    <VariantDropdown options={options} />
  ) : (
    <VariantButtons options={options} />
  )
}

export { ProductOptions }

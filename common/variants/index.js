import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import filter from 'lodash/filter'
import flatMap from 'lodash/flatMap'

function onlyAvailableVariantsOptions(variants) {
  return groupBy(
    flatMap(variants, (variant) => variant.selectedOptions),
    'name'
  )
}

function onlyUniqueOptionValues(optionValues) {
  return uniqBy(optionValues, 'value').filter((item) => item.value)
}

function formatAvailableOptions(availOptions) {
  return map(availOptions, (optionValues, optionName) => {
    return {
      name: optionName,
      values: onlyUniqueOptionValues(optionValues),
    }
  })
}

function filterOnlyAvailableVariants(variants) {
  return filter(variants, function (v) {
    return v.availableForSale
  })
}

function onlyAvailableOptionsFromVariants(variants) {
  if (!variants.length) {
    return false
  }

  return formatAvailableOptions(onlyAvailableVariantsOptions(filterOnlyAvailableVariants(variants)))
}

export { onlyAvailableOptionsFromVariants }

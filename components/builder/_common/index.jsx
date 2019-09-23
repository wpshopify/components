import compact from 'lodash/compact'
import map from 'lodash/map'
import { graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { buildQueryStringFromSelections } from '../../storefront/selections'

function defaultColors() {
   return [
      { name: 'Pale pink', color: 'rgb(247, 141, 167)' },
      { name: 'Vivid red', color: 'rgb(207, 46, 46)' },
      { name: 'Luminous vivid', color: 'rgb(255, 105, 0)' },
      { name: 'Luminous vivid amber', color: 'rgb(252, 185, 0)' },
      { name: 'Light green cyan', color: 'rgb(123, 220, 181)' },
      { name: 'Vivid green cyan', color: 'rgb(0, 208, 132)' },
      { name: 'Pale cyan blue', color: 'rgb(142, 209, 252)' },
      { name: 'Pale cyan blue', color: 'rgb(6, 147, 227)' },
      { name: 'Pale cyan blue', color: 'rgb(238, 238, 238)' },
      { name: 'Pale cyan blue', color: 'rgb(171, 184, 195)' },
      { name: 'Pale cyan blue', color: 'rgb(49, 49, 49)' }
   ]
}

function splitSelection(string) {
   return string.split(',')
}

function removeEmptyValues(stringSelection) {
   var stuff = compact(splitSelection(stringSelection))

   var final = map(stuff, val => val.trim())

   return compact(final)
}

function buildQueryFromSelections(builderState) {
   var selections = {}

   selections.titles = builderState.settings.title
   selections.tags = builderState.settings.tag
   selections.vendors = builderState.settings.vendor
   selections.types = builderState.settings.productType
   selections.available_for_sale = builderState.settings.availableForSale

   return buildQueryStringFromSelections(selections, builderState.settings.connective)
}

function fetchNewItems(type, builderState) {
   const queryString = buildQueryFromSelections(builderState)

   var stuff = {
      first: builderState.settings.pageSize,
      query: queryString,
      reverse: builderState.settings.reverse,
      sortKey: builderState.settings.sortBy
   }

   console.log('F I N A L queryParams :: ', stuff)

   return graphQuery(type, stuff)
}

export { defaultColors, fetchNewItems, removeEmptyValues, buildQueryFromSelections }

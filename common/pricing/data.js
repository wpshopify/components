import concat from 'lodash/concat'
import compact from 'lodash/compact'

function sortAsc(a, b) {
   return a - b
}

function sortPricesAsc(prices) {
   return prices.sort(sortAsc)
}

function convertToFloat(maybeString) {
   return maybeString ? parseFloat(maybeString) : false
}

function pricesArray(product, type) {
   return compact(product.variants.reduce((acc, current) => concat(acc, convertToFloat(current[type])), []))
}

function getPrices(product, sort = false) {
   if (sort === 'asc') {
      return {
         regPrices: sortPricesAsc(pricesArray(product, 'price')),
         compareAtPrices: sortPricesAsc(pricesArray(product, 'compareAtPrice'))
      }
   }

   return {
      regPrices: pricesArray(product, 'price'),
      compareAtPrices: pricesArray(product, 'compareAtPrice')
   }
}

export { getPrices }

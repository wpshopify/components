function sortAsc(a, b) {
   return a - b
}

function sortPricesAsc(prices) {
   return prices.sort(sortAsc)
}

function convertToFloat(maybe_string) {
   return parseFloat(maybe_string)
}

function onlyPrices(variant) {
   console.log('variant', variant)

   return {
      price: convertToFloat(variant.price),
      compareAtPrice: convertToFloat(variant.compareAtPrice)
   }
}

function getPricesFromVariants(product) {
   return product.variants.map(onlyPrices)
}

function getPrices(product, sort = false) {
   const prices = getPricesFromVariants(product)

   if (sort === 'asc') {
      return sortPricesAsc(prices)
   }

   return prices
}

export { getPrices }

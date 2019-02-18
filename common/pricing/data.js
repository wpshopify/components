  function sortingSmallToBig(a, b) {
    return a - b;
  }

  function sortPrices(prices) {
    return prices.sort( sortingSmallToBig );
  }

  function convertPriceToFloat(variant) {
    return parseFloat(variant.price);
  }

  function mapPrices(product) {
    return product.variants.map( convertPriceToFloat );
  }

  function getPrices(product) {
    return sortPrices( mapPrices(product) );
  }

  export {
    getPrices
  }

import find from 'lodash/find'

function blacklistedCountries() {
  return ['Kazakhstan']
}

function countryBlacklisted(country) {
  return blacklistedCountries().find((blacklistedCountry) => country === blacklistedCountry)
}

/*

Only purpose is to compliment the 'country-data' NPM package.

TODO: Think about replacing this with something better?

*/
function countryFallbacks() {
  return [
    {
      countryName: 'South Korea',
      currencies: ['KRW'],
    },
    {
      countryName: 'Kazakhstan',
      currencies: ['KZT'],
    },
  ]
}

function findFallbackCountry(location) {
  return find(countryFallbacks(), (country) => location.address.country === country.countryName)
}

function getCurrencyCodeByLocationFallback(location) {
  var foundCountry = findFallbackCountry(location)

  if (!foundCountry) {
    console.warn('WP Shopify warning: Could not find country code from location: ', location)
    return 'USD'
  }

  return foundCountry.currencies[0]
}

export { countryFallbacks, getCurrencyCodeByLocationFallback, countryBlacklisted }

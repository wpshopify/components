import ProductPlaceholder from './products'
import SearchPlaceholder from './search'
import StorefrontPlaceholder from './storefront'

function Placeholder({ type }) {
  return type === 'search' ? (
    <SearchPlaceholder />
  ) : type === 'products' ? (
    <ProductPlaceholder />
  ) : type === 'storefront' ? (
    <StorefrontPlaceholder />
  ) : (
    <ProductPlaceholder />
  )
}

export default Placeholder

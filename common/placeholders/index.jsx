import ProductPlaceholder from './products'
import ProductTitlePlaceholder from './products-title'
import ProductDescriptionPlaceholder from './products-description'
import ProductPricingPlaceholder from './products-pricing'
import ProductBuyButtonPlaceholder from './products-buy-button'
import ProductImagesPlaceholder from './products-images'
import SearchPlaceholder from './search'
import StorefrontPlaceholder from './storefront'

function Placeholder({ type }) {
  return type === 'search' ? (
    <SearchPlaceholder />
  ) : type === 'products' ? (
    <ProductPlaceholder />
  ) : type === 'products/title' ? (
    <ProductTitlePlaceholder />
  ) : type === 'products/description' ? (
    <ProductDescriptionPlaceholder />
  ) : type === 'products/pricing' ? (
    <ProductPricingPlaceholder />
  ) : type === 'products/buy-button' ? (
    <ProductBuyButtonPlaceholder />
  ) : type === 'products/images' ? (
    <ProductImagesPlaceholder />
  ) : type === 'storefront' ? (
    <StorefrontPlaceholder />
  ) : (
    <ProductTitlePlaceholder />
  )
}

export default Placeholder

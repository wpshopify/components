/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ProductPrice from '../price'
import ProductPriceSaleNotice from '../sale-notice'

function ProductPricesCompareAt({
  prices,
  compareAt,
  currencyCode,
  selectedVariant,
  showPriceRange,
}) {
  const styles = css`
    display: flex;
    flex-direction: ${showPriceRange && !selectedVariant ? 'column' : 'row'};
    align-items: baseline;
    position: relative;

    + .wps-buy-button-wrapper > .wps-product-quantity-wrapper {
      margin-top: 1.7em;
    }
  `

  return (
    <div className='wps-pricing-compare-at' css={styles}>
      <ProductPrice
        selectedVariant={selectedVariant}
        compareAt={false}
        prices={prices}
        showPriceRange={showPriceRange}
        currencyCode={currencyCode}
      />

      {compareAt && (
        <>
          {console.log('prices.compareAtPrices[0]', prices.compareAtPrices[0])}
          {console.log('selectedVariant')}

          {(prices.compareAtPrices[0] || selectedVariant.compareAtPriceV2) && (
            <ProductPriceSaleNotice
              showPriceRange={showPriceRange}
              selectedVariant={selectedVariant}
            />
          )}

          <ProductPrice
            selectedVariant={selectedVariant}
            compareAt={true}
            prices={prices}
            showPriceRange={showPriceRange}
            currencyCode={currencyCode}
          />
        </>
      )}
    </div>
  )
}

export default wp.element.memo(ProductPricesCompareAt)

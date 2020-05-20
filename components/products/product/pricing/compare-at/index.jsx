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
    align-items: ${showPriceRange && !selectedVariant ? 'flex-start' : 'center'};
    position: relative;
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

      {(!showPriceRange || selectedVariant) && compareAt && (
        <ProductPriceSaleNotice showPriceRange={showPriceRange} selectedVariant={selectedVariant} />
      )}

      {compareAt && (
        <ProductPrice
          selectedVariant={selectedVariant}
          compareAt={true}
          prices={prices}
          showPriceRange={showPriceRange}
          currencyCode={currencyCode}
        />
      )}
    </div>
  )
}

export default ProductPricesCompareAt

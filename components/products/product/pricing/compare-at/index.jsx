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
  const ProductPricesCompareAtCSS = css`
    display: flex;
    flex-direction: ${showPriceRange && !selectedVariant ? 'column' : 'row'};
    align-items: baseline;
    position: relative;
    margin-bottom: ${compareAt ? '0' : '25px'};

    + .wps-buy-button-wrapper > .wps-product-quantity-wrapper {
      margin-top: 1.7em;
    }
  `

  const ProductPricesCompareAtWrapperCSS = css`
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-bottom: 30px;
    margin-left: ${showPriceRange ? '0' : '10px'};
  `

  return (
    <div className='wps-pricing-compare-at' css={ProductPricesCompareAtCSS}>
      <ProductPrice
        selectedVariant={selectedVariant}
        compareAt={false}
        prices={prices}
        showPriceRange={showPriceRange}
        currencyCode={currencyCode}
      />

      {compareAt && (
        <div className='wps-product-prices-compare-at' css={ProductPricesCompareAtWrapperCSS}>
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
        </div>
      )}
    </div>
  )
}

export default wp.element.memo(ProductPricesCompareAt)

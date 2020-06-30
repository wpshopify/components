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
  const ProductPricesCompareAtWrapperCSS = css`
    display: flex;
    align-items: center;
    margin: 0;

    &:empty {
      display: none;
    }
  `

  return (
    <>
      <ProductPrice
        selectedVariant={selectedVariant}
        compareAt={false}
        prices={prices}
        showPriceRange={showPriceRange}
        currencyCode={currencyCode}
      />

      {compareAt && (
        <div className='wps-product-prices-compare-at' css={ProductPricesCompareAtWrapperCSS}>
          <ProductPriceSaleNotice
            selectedVariant={selectedVariant}
            prices={prices}
            currencyCode={currencyCode}
          />
        </div>
      )}
    </>
  )
}

export default wp.element.memo(ProductPricesCompareAt)

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
    margin: 10px 0 0 0;

    .wps-product-individual-price {
      font-size: 15px;
    }

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
            showPriceRange={showPriceRange}>
            <ProductPrice
              selectedVariant={selectedVariant}
              compareAt={true}
              prices={prices}
              showPriceRange={showPriceRange}
              currencyCode={currencyCode}
            />
          </ProductPriceSaleNotice>
        </div>
      )}
    </>
  )
}

export default wp.element.memo(ProductPricesCompareAt)

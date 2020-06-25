import ProductPriceSingle from '../single'
import ProductPricingRangeGroup from './group'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function ProductPricingRange({
  firstPrice,
  lastPrice,
  isFirstAndLastSame,
  currencyCode,
  compareAt,
  showPriceRange,
}) {
  const showPriceRangeStyles = css`
    margin-top: 0;
    position: ${showPriceRange && compareAt ? 'relative' : 'static'};
    display: flex;
    align-items: baseline;
    height: 100%;
    line-height: 1;
  `

  return (
    <span className='wps-pricing-range-wrapper' css={showPriceRangeStyles}>
      {isFirstAndLastSame ? (
        <ProductPriceSingle
          showPriceRange={showPriceRange}
          price={firstPrice}
          currencyCode={currencyCode}
          compareAt={compareAt}
        />
      ) : (
        <ProductPricingRangeGroup
          firstPrice={firstPrice}
          lastPrice={lastPrice}
          currencyCode={currencyCode}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
        />
      )}
    </span>
  )
}

export default wp.element.memo(ProductPricingRange)

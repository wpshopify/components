import ProductPriceSingle from '../../single';
import ProductPriceFrom from '../../from';
import { ProductPricingSeparator } from '../../separator';

function ProductPricingRangeGroup({
  firstPrice,
  lastPrice,
  currencyCode,
  compareAt,
  showPriceRange,
  pricingColor,
}) {
  return (
    <>
      {firstPrice !== lastPrice ? <ProductPriceFrom compareAt={compareAt} /> : ''}
      <ProductPriceSingle
        price={firstPrice}
        compareAt={compareAt}
        currencyCode={currencyCode}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
      />
      <ProductPricingSeparator />
      <ProductPriceSingle
        price={lastPrice}
        compareAt={compareAt}
        currencyCode={currencyCode}
        showPriceRange={showPriceRange}
        pricingColor={pricingColor}
      />
    </>
  );
}

export default wp.element.memo(ProductPricingRangeGroup);

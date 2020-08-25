import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import min from 'lodash/min';
import max from 'lodash/max';

import ProductPricingRange from '../range';
import ProductPriceSingle from '../single';
import { useAnime, fadeInRightSlow } from '../../../../../common/animations';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const { useEffect, useRef, useState } = wp.element;

function lastPrice(prices, type) {
  if (isEmpty(prices)) {
    return 0;
  }
  return last(prices[type]);
}

function firstRegPrice(prices) {
  if (isEmpty(prices)) {
    return 0;
  }

  return prices.regPrices[0];
}

function firstPriceCompareAt(prices) {
  if (isEmpty(prices)) {
    return 0;
  }

  return prices.compareAtPrices[0];
}

function lastRegPrice(prices) {
  return lastPrice(prices, 'regPrices');
}

function lastPriceCompareAt(prices) {
  return lastPrice(prices, 'compareAtPrices');
}

function ProductPrice({
  compareAt,
  prices,
  currencyCode,
  showPriceRange,
  selectedVariant,
  payloadSettings,
}) {
  const singlePriceElement = useRef();
  const [regPrice, setRegPrice] = useState(() => getFirstPrice());
  const [comparePrice, setComparePrice] = useState(() => firstPriceCompareAt(prices));
  const animeFadeInRightSlow = useAnime(fadeInRightSlow);

  function isRegAndCompareSame() {
    if (!showPriceRange && compareAt) {
      var firstCompare = firstPriceCompareAt(prices);
      var firstReg = firstRegPrice(prices);

      if (firstCompare === firstReg) {
        return true;
      }
    }

    return false;
  }

  function isFirstAndLastSame() {
    if (getFirstPrice() === getLastPrice()) {
      return true;
    }

    return false;
  }

  function getFirstPrice() {
    if (compareAt) {
      if (showPriceRange) {
        return min(prices.compareAtPrices);
      } else {
        return firstPriceCompareAt(prices);
      }
    } else {
      if (showPriceRange) {
        return min(prices.regPrices);
      } else {
        return firstRegPrice(prices);
      }
    }
  }

  function getLastPrice() {
    if (compareAt) {
      if (showPriceRange) {
        return max(prices.compareAtPrices);
      } else {
        return lastPriceCompareAt(prices);
      }
    } else {
      if (showPriceRange) {
        return max(prices.regPrices);
      } else {
        return lastRegPrice(prices);
      }
    }
  }

  useEffect(() => {
    if (selectedVariant) {
      if (selectedVariant.compareAtPriceV2) {
        setComparePrice(selectedVariant.compareAtPriceV2.amount);
      } else {
        setComparePrice(false);
      }

      setRegPrice(selectedVariant.priceV2.amount);

      if (!compareAt) {
        animeFadeInRightSlow(singlePriceElement.current);
      }
    } else {
      setComparePrice(firstPriceCompareAt(prices));
      setRegPrice(getFirstPrice());
    }
  }, [selectedVariant]);

  const priceWrapperCSS = css`
    line-height: 1;
    margin: 0 15px 0 0;
    display: block;
    font-family: ${payloadSettings.pricingFont ? payloadSettings.pricingFont : 'inherit'};
    font-weight: ${payloadSettings.pricingFontWeight
      ? payloadSettings.pricingFontWeight
      : 'inherit'};

    &[data-show-price-range='true'] + .wps-product-prices-compare-at {
      margin-top: 10px;
    }
  `;

  return !isRegAndCompareSame() ? (
    <span
      itemScope
      itemProp='offers'
      itemType='https://schema.org/Offer'
      className='wps-products-price wps-product-pricing wps-products-price-one'
      data-show-price-range={showPriceRange}
      css={priceWrapperCSS}>
      {showPriceRange && !selectedVariant ? (
        <ProductPricingRange
          firstPrice={getFirstPrice()}
          lastPrice={getLastPrice()}
          isFirstAndLastSame={isFirstAndLastSame()}
          currencyCode={currencyCode}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
        />
      ) : (
        <ProductPriceSingle
          currencyCode={currencyCode}
          ref={singlePriceElement}
          price={compareAt ? comparePrice : regPrice}
          compareAt={compareAt}
          showPriceRange={showPriceRange}
        />
      )}
    </span>
  ) : null;
}

export default ProductPrice;

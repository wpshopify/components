import ProductVariantDropdowns from '../variant-dropdowns';
import ProductVariantButtons from '../variant-buttons';
import ClearSelections from '../clear-selections';
import isEmpty from 'lodash/isEmpty';

/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function ProductOptions({
  variantStyle,
  availableOptions,
  missingSelections,
  selectedOptions,
  availableVariants,
  variants,
  showPriceUnderVariantButton,
  productDispatch,
  payloadSettings,
}) {
  const ProductOptionsCSS = css`
    position: relative;
  `;

  return (
    <div
      className='wps-product-options'
      css={ProductOptionsCSS}
      aria-label={`Product variant ${variantStyle ? variantStyle : 'dropdown'}`}>
      {!isEmpty(selectedOptions) && (
        <ClearSelections productDispatch={productDispatch} variantStyle={variantStyle} />
      )}
      {variantStyle === 'dropdown' ? (
        <ProductVariantDropdowns
          options={availableOptions}
          missingSelections={missingSelections}
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          variants={variants}
          payloadSettings={payloadSettings}
        />
      ) : variantStyle === 'buttons' && wpshopify.misc.isPro ? (
        <ProductVariantButtons
          options={availableOptions}
          missingSelections={missingSelections}
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          variants={variants}
          showPriceUnderVariantButton={showPriceUnderVariantButton}
        />
      ) : (
        <ProductVariantDropdowns
          payloadSettings={payloadSettings}
          options={availableOptions}
          missingSelections={missingSelections}
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          variants={variants}
        />
      )}
    </div>
  );
}

export default ProductOptions;

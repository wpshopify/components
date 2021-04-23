import ProductVariantDropdowns from '../variant-dropdowns';
import ProductVariantButtons from '../variant-buttons';

function ProductOptions({
  variantStyle,
  availableOptions,
  missingSelections,
  selectedOptions,
  availableVariants,
  variants,
  showPriceUnderVariantButton,
}) {
  return variantStyle === 'dropdown' ? (
    <ProductVariantDropdowns
      options={availableOptions}
      missingSelections={missingSelections}
      availableVariants={availableVariants}
      selectedOptions={selectedOptions}
      variants={variants}
    />
  ) : wpshopify.misc.isPro ? (
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
      options={availableOptions}
      missingSelections={missingSelections}
      availableVariants={availableVariants}
      selectedOptions={selectedOptions}
      variants={variants}
    />
  );
}

export default ProductOptions;

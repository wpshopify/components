import ProductVariantDropdowns from '../variant-dropdowns';
import ProductVariantButtons from '../variant-buttons';

function ProductOptions({
  variantStyle,
  availableOptions,
  missingSelections,
  selectedOptions,
  availableVariants,
}) {
  return variantStyle === 'dropdown' ? (
    <ProductVariantDropdowns
      options={availableOptions}
      missingSelections={missingSelections}
      availableVariants={availableVariants}
      selectedOptions={selectedOptions}
    />
  ) : wpshopify.misc.isPro ? (
    <ProductVariantButtons
      options={availableOptions}
      missingSelections={missingSelections}
      availableVariants={availableVariants}
      selectedOptions={selectedOptions}
    />
  ) : (
    <ProductVariantDropdowns
      options={availableOptions}
      missingSelections={missingSelections}
      availableVariants={availableVariants}
      selectedOptions={selectedOptions}
    />
  );
}

export default ProductOptions;

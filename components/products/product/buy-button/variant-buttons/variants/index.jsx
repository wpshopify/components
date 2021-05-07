import ProductVariant from '../../option/variants/variant';
import ProductVariantButtonValue from '../variant';

function ProductVariantsButtons({
  option,
  selectedOptions,
  availableVariants,
  variants,
  totalOptions,
  showPriceUnderVariantButton,
}) {
  return option.values.map((variant) => (
    <ProductVariant
      selectedOptions={selectedOptions}
      availableVariants={availableVariants}
      variant={variant}
      key={variant.name + variant.value}
      variants={variants}
      totalOptions={totalOptions}
      showPriceUnderVariantButton={showPriceUnderVariantButton}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ));
}

export default wp.element.memo(ProductVariantsButtons);

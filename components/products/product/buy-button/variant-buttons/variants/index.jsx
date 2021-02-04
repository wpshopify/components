import ProductVariant from '../../option/variants/variant';
import { v4 as uuidv4 } from 'uuid';

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
      key={uuidv4()}
      variants={variants}
      totalOptions={totalOptions}
      showPriceUnderVariantButton={showPriceUnderVariantButton}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ));
}

export default wp.element.memo(ProductVariantsButtons);

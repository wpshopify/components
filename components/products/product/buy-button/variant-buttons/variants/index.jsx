import ProductVariant from '../../option/variants/variant'
import { v4 as uuidv4 } from 'uuid'

import ProductVariantButtonValue from '../variant'

function ProductVariantsButtons({ option, selectedOptions, availableVariants }) {
  return option.values.map((variant) => (
    <ProductVariant
      selectedOptions={selectedOptions}
      availableVariants={availableVariants}
      variant={variant}
      key={uuidv4()}>
      <ProductVariantButtonValue />
    </ProductVariant>
  ))
}

export default wp.element.memo(ProductVariantsButtons)

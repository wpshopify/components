import { ProductOptionProvider } from '../../option/_state/provider'

import ProductOptionWrapper from '../../option/wrapper'
import ProductVariantButtonGroupWrapper from '../variant-button-group-wrapper'

function ProductVariantButtonGroup({ option }) {
  return option ? (
    <ProductOptionProvider
      options={{
        option: option,
      }}>
      <ProductOptionWrapper option={option}>
        <ProductVariantButtonGroupWrapper option={option} />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  ) : (
    ''
  )
}

export default ProductVariantButtonGroup

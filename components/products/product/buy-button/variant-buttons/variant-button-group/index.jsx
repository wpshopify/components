import { ProductOptionProvider } from '../../option/_state/provider'

import ProductOptionWrapper from '../../option/wrapper'
import ProductVariantButtonGroupWrapper from '../variant-button-group-wrapper'

function ProductVariantButtonGroup({ option }) {
  console.log('<ProductVariantButtonGroup> :: Render Start')

  return option ? (
    <ProductOptionProvider
      options={{
        option: option,
      }}>
      <ProductOptionWrapper>
        <ProductVariantButtonGroupWrapper option={option} />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  ) : (
    ''
  )
}

export default ProductVariantButtonGroup

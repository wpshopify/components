import ProductQuantityLabel from './label'
import { ProductQuantityInput } from './input'

function ProductQuantity({ showLabel, labelText, minQuantity, maxQuantity, addedToCart }) {
  return (
    <div className='wps-component wps-component-products-quantity'>
      <div className='wps-form-control wps-product-quantity-wrapper'>
        <ProductQuantityLabel showLabel={showLabel} labelText={labelText} />
        <ProductQuantityInput
          minQuantity={minQuantity}
          maxQuantity={maxQuantity}
          addedToCart={addedToCart}
        />
      </div>
    </div>
  )
}

export default wp.element.memo(ProductQuantity)

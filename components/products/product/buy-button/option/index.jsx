import { ProductOptionProvider } from './_state/provider'
import ProductOptionWrapper from './wrapper'
import ProductOptionDropdown from './dropdown'

const { useRef } = wp.element

function ProductOption({ option }) {
  const dropdownElement = useRef()

  return (
    <ProductOptionProvider
      options={{
        option: option,
        dropdownElement: dropdownElement,
      }}>
      <ProductOptionWrapper>
        <ProductOptionDropdown />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  )
}

export default wp.element.memo(ProductOption)

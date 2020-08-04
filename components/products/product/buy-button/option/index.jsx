import { ProductOptionProvider } from './_state/provider'
import ProductOptionWrapper from './wrapper'
import ProductOptionDropdown from './dropdown'

const { useRef } = wp.element

function ProductOption({ option, availableVariants, selectedOptions, missingSelections }) {
  const dropdownElement = useRef()

  return (
    <ProductOptionProvider
      options={{
        option: option,
        dropdownElement: dropdownElement,
      }}>
      <ProductOptionWrapper>
        <ProductOptionDropdown
          availableVariants={availableVariants}
          selectedOptions={selectedOptions}
          missingSelections={missingSelections}
        />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  )
}

export default wp.element.memo(ProductOption)

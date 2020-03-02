import { ProductOptionProvider } from './_state/provider'
import { ProductOptionWrapper } from './wrapper'

const { useRef } = wp.element
const ProductOptionDropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionDropdown' */ './dropdown')
)

function ProductOption({ option }) {
  const dropdownElement = useRef()

  return (
    <ProductOptionProvider
      options={{
        option: option,
        dropdownElement: dropdownElement
      }}>
      <ProductOptionWrapper>
        <ProductOptionDropdown />
      </ProductOptionWrapper>
    </ProductOptionProvider>
  )
}

export { ProductOption }

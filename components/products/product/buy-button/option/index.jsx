import { ProductOptionProvider } from './_state/provider'

const ProductOptionWrapper = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionWrapper' */ './wrapper')
)

const ProductOptionDropdown = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductOptionDropdown' */ './dropdown')
)
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

export default ProductOption

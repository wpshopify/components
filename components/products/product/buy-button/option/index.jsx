import { ProductOptionProvider } from './_state/provider.jsx'

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
      <ProductOptionDropdown />
    </ProductOptionProvider>
  )
}

export { ProductOption }

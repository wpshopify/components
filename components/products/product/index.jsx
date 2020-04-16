import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'
const { Suspense } = wp.element
const { Spinner } = wp.components

function Product({ payload, isFirstItem }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductProvider payload={payload}>
        <ProductWrapper isFirstItem={isFirstItem} />
      </ProductProvider>
    </Suspense>
  )
}

export { Product }

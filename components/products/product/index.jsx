import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'
const { Suspense } = wp.element
const { Spinner } = wp.components

function Product({ payload }) {
  console.log('<Product> :: Render Start')

  return (
    <ProductProvider payload={payload}>
      <Suspense fallback={<Spinner />}>
        <ProductWrapper />
      </Suspense>
    </ProductProvider>
  )
}

export { Product }

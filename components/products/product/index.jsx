import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'

function Product({ payload }) {
  return (
    <ProductProvider payload={payload}>
      <ProductWrapper />
    </ProductProvider>
  )
}

export { Product }

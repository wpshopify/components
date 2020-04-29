import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'

function Product({ payload }) {
  console.log('<Product> :: Render Start', payload)

  return (
    <ProductProvider payload={payload}>
      <ProductWrapper />
    </ProductProvider>
  )
}

export { Product }

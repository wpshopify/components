import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'

function Product({ payload, payloadSettings }) {
  console.log('::::: Product 1 :::::')
  return (
    <ProductProvider payload={payload} payloadSettings={payloadSettings}>
      <ProductWrapper />
    </ProductProvider>
  )
}

export { Product }

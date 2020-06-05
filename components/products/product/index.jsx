import { ProductProvider } from './_state/provider'
import { ProductWrapper } from './wrapper'

function Product({ payload, payloadSettings }) {
  return (
    <ProductProvider payload={payload} payloadSettings={payloadSettings}>
      <ProductWrapper payloadSettings={payloadSettings} />
    </ProductProvider>
  )
}

export { Product }

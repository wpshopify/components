import { Product } from './product'
import { Pagination } from '../pagination'
import { ShopContext } from '../shop/_state/context'

const { useContext } = wp.element

function Products() {
  const [shopState] = useContext(ShopContext)

  return (
    <Pagination shopSettings={shopState.settings}>
      <Product />
    </Pagination>
  )
}

export { Products }

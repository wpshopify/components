import { Product } from './product'
import { Pagination } from '../pagination'

function Products() {
  console.log('<Products> :: Render Start')

  return (
    <Pagination>
      <Product />
    </Pagination>
  )
}

export { Products }

import { Collection } from './collection'
import { ItemsContext } from '../items/_state/context'
import Pagination from '../pagination'

function Collections() {
  const { useContext } = wp.element
  const [itemsState] = useContext(ItemsContext)

  return (
    <Pagination>
      <Collection itemsState={itemsState} />
    </Pagination>
  )
}

export { Collections }

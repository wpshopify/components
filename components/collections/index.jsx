import { Collection } from './collection'
import { Pagination } from '../pagination'
import { ItemsContext } from '../items/_state/context'

const { useContext } = wp.element

function Collections() {
  const [itemsState] = useContext(ItemsContext)

  return (
    <Pagination>
      <Collection itemsState={itemsState} />
    </Pagination>
  )
}

export { Collections }

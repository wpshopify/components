import { findPortalElement } from '../../../../common/utils'
import { usePortal } from '../../../../common/hooks'
import { Items } from '../../../items'
import { Products } from '../../../products'
import { CollectionContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'

const { useContext } = wp.element

function CollectionProducts() {
  const [collectionState, collectionDispatch] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)

  function updateCollectionProducts(payload) {
    collectionDispatch({ type: 'UPDATE_PRODUCTS', payload: payload })
  }

  return (
    collectionState.products &&
    usePortal(
      <Items
        payload={collectionState.products}
        options={collectionState.productOptions}
        afterLoading={updateCollectionProducts}>
        <Products />
      </Items>,
      findPortalElement(itemsState.element, itemsState.payloadSettings.dropzoneCollectionProducts)
    )
  )
}

export { CollectionProducts }

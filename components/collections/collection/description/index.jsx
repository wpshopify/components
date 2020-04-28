import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

const { useContext } = wp.element

function CollectionDescription() {
  const [collectionState] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)

  return usePortal(
    <div
      itemProp='description'
      className='wps-collections-description'
      dangerouslySetInnerHTML={{ __html: collectionState.payload.descriptionHtml }}
    />,
    findPortalElement(
      collectionState.element,
      itemsState.payloadSettings.dropzoneCollectionDescription
    )
  )
}

export { CollectionDescription }

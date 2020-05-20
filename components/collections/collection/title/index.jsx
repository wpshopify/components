import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { Link } from '../../../link'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, _t } from '../../../../common/utils'
import { hasLink } from '../../../../common/settings'

const { useContext } = wp.element

function CollectionTitle() {
  const [collectionState] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)

  function Title() {
    return (
      <h2 itemProp='name' className='wps-collection-title'>
        {collectionState.payload.title}
      </h2>
    )
  }

  return usePortal(
    <div className='wps-component wps-component-collection-title'>
      {hasLink(itemsState) ? (
        <Link
          type='collections'
          payload={collectionState.payload}
          linkTo={itemsState.payloadSettings.linkTo}
          target={itemsState.payloadSettings.linkTarget}>
          <Title />
        </Link>
      ) : (
        <Title />
      )}
    </div>,
    findPortalElement(collectionState.element, itemsState.payloadSettings.dropzoneCollectionTitle)
  )
}

export { CollectionTitle }

import { ItemsContext } from '../../../items/_state/context'
import { CollectionContext } from '../_state/context'
import { Link } from '../../../link'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, _t } from '../../../../common/utils'
import { hasLink } from '../../../../common/settings'

const { useContext } = wp.element

function Title({ title }) {
  return (
    <h2 itemProp='name' className='wps-collection-title'>
      {title}
    </h2>
  )
}

function CollectionTitle({ payloadSettings }) {
  const [collectionState] = useContext(CollectionContext)

  return usePortal(
    <div className='wps-component wps-component-collection-title'>
      {hasLink(payloadSettings) ? (
        <Link
          type='collections'
          payload={collectionState.payload}
          linkTo={payloadSettings.linkTo}
          target={payloadSettings.linkTarget}>
          <Title title={collectionState.payload.title} />
        </Link>
      ) : (
        <Title title={collectionState.payload.title} />
      )}
    </div>,
    findPortalElement(collectionState.element, payloadSettings.dropzoneCollectionTitle)
  )
}

export { CollectionTitle }

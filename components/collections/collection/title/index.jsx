import { ItemsContext } from '../../../items/_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { CollectionContext } from '../_state/context'
import { Link } from '../../../link'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, _t } from '../../../../common/utils'
import { hasLink } from '../../../../common/settings'

const { useContext } = wp.element

function CollectionTitle({ isShopReady, shopInfo }) {
  const [collectionState] = useContext(CollectionContext)
  const [itemsState] = useContext(ItemsContext)
  const [shopState] = useContext(ShopContext)

  function Title() {
    return (
      <h2
        itemProp='name'
        className='wps-collection-title'
        data-wps-is-ready={isShopReady ? '1' : '0'}>
        {collectionState.payload.title}
      </h2>
    )
  }

  return usePortal(
    <div className='wps-component wps-component-collection-title' data-wps-component-order='0'>
      {hasLink(itemsState, shopState) ? (
        <Link
          type='collections'
          shop={shopInfo}
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

import { findPortalElement } from '../../../../common/utils';
import { usePortal } from '../../../../common/hooks';
import { Items } from '../../../items';
import { Products } from '../../../products';
import { CollectionContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';

const { useContext } = wp.element;

function CollectionProducts() {
  const [collectionState] = useContext(CollectionContext);
  const [itemsState] = useContext(ItemsContext);

  return collectionState.products
    ? usePortal(
        <Items payload={collectionState.products} options={collectionState.productOptions}>
          <Products />
        </Items>,
        findPortalElement(itemsState.payloadSettings.dropzoneCollectionProducts)
      )
    : null;
}

export { CollectionProducts };

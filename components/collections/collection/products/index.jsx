import { findPortalElement } from '../../../../common/utils';
import { usePortal } from '../../../../common/hooks';
import { Items } from '../../../items';
import { Products } from '../../../products';
import { CollectionContext } from '../_state/context';

function CollectionProducts({ dropzone, componentId }) {
  const { useContext } = wp.element;
  const [collectionState] = useContext(CollectionContext);

  return collectionState.products
    ? usePortal(
        <Items
          payload={collectionState.products}
          options={collectionState.productOptions}
          componentId={componentId}>
          <Products />
        </Items>,
        findPortalElement(dropzone)
      )
    : null;
}

export { CollectionProducts };

import { CollectionContext } from '../_state/context';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { hasLink } from '../../../../common/settings';

const Link = wp.element.lazy(() => import(/* webpackChunkName: 'Link-public' */ '../../../link'));

const { useContext } = wp.element;

function Title({ title }) {
  return (
    <h2 itemProp='name' className='wps-collection-title'>
      {title}
    </h2>
  );
}

function CollectionTitle({ payloadSettings }) {
  const [collectionState] = useContext(CollectionContext);

  return usePortal(
    <div className='wps-component wps-component-collection-title' aria-label='Collection Title'>
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
    findPortalElement(payloadSettings.dropzoneCollectionTitle)
  );
}

export { CollectionTitle };

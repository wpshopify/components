import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

function CollectionDescription({ dropzone, description }) {
  return usePortal(
    <div
      itemProp='description'
      className='wps-collections-description'
      dangerouslySetInnerHTML={{ __html: description }}
    />,
    findPortalElement(dropzone)
  );
}

export { CollectionDescription };

import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '../../../../common/utils';

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

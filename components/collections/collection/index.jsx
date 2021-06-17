import { CollectionImage } from './image';
import { CollectionTitle } from './title';
import { CollectionDescription } from './description';
import { CollectionProducts } from './products';
import { CollectionProvider } from './_state/provider';
import { isShowingComponent } from '../../../common/components';
import { itemWidthClass } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function Collection({ payload, payloadSettings, componentId }) {
  return (
    <div className={`${itemWidthClass(payloadSettings.itemsPerRow)} wps-item`}>
      <CollectionProvider payloadSettings={payloadSettings} payload={payload}>
        {isShowingComponent(payloadSettings, 'image') && (
          <CollectionImage payloadSettings={payloadSettings} />
        )}
        {isShowingComponent(payloadSettings, 'title') && (
          <CollectionTitle payloadSettings={payloadSettings} />
        )}
        {isShowingComponent(payloadSettings, 'description') && (
          <CollectionDescription
            dropzone={payloadSettings.dropzoneCollectionDescription}
            description={payload.descriptionHtml}
          />
        )}
        {isShowingComponent(payloadSettings, 'products') && (
          <CollectionProducts
            componentId={componentId}
            dropzone={payloadSettings.dropzoneCollectionProducts}
          />
        )}
      </CollectionProvider>
    </div>
  );
}

export default wp.element.memo(Collection);

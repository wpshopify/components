import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionProducts } from './products'
import { CollectionProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

function Collection({ payload, payloadSettings }) {
  return (
    <div className={`${itemWidthClass(payloadSettings.itemsPerRow)} wps-item`}>
      <CollectionProvider payloadSettings={payloadSettings} payload={payload}>
        {isShowingComponent(payloadSettings, 'image') && !payloadSettings.single && (
          <CollectionImage />
        )}
        {isShowingComponent(payloadSettings, 'title') && !payloadSettings.single && (
          <CollectionTitle payloadSettings={payloadSettings} />
        )}
        {isShowingComponent(payloadSettings, 'description') && !payloadSettings.single && (
          <CollectionDescription />
        )}
        {isShowingComponent(payloadSettings, 'products') && payloadSettings.single && (
          <CollectionProducts />
        )}
      </CollectionProvider>
    </div>
  )
}

export default wp.element.memo(Collection)

import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionProducts } from './products'
import { CollectionProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

function Collection({ payload, payloadSettings }) {
  console.log('COLLECTION payloadSettings', payloadSettings)

  return (
    <div className={`${itemWidthClass(payloadSettings.itemsPerRow)} wps-item`}>
      <CollectionProvider payloadSettings={payloadSettings} payload={payload}>
        {isShowingComponent(payloadSettings, 'image') && <CollectionImage />}
        {isShowingComponent(payloadSettings, 'title') && (
          <CollectionTitle payloadSettings={payloadSettings} />
        )}
        {isShowingComponent(payloadSettings, 'description') && <CollectionDescription />}
        {isShowingComponent(payloadSettings, 'products') && <CollectionProducts />}
      </CollectionProvider>
    </div>
  )
}

export default wp.element.memo(Collection)

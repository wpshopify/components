import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionProducts } from './products'
import { CollectionProvider } from './_state/provider'
import { isShowingComponent } from '../../../common/components'
import { itemWidthClass } from '../../../common/utils'

const Collection = wp.element.memo(function Collection({ itemsState, payload }) {
  return (
    <div className={`${itemWidthClass(itemsState.payloadSettings.itemsPerRow)} wps-item p-3`}>
      <CollectionProvider itemsState={itemsState} payload={payload}>
        {isShowingComponent(itemsState, 'image') && <CollectionImage />}
        {isShowingComponent(itemsState, 'title') && <CollectionTitle />}
        {isShowingComponent(itemsState, 'description') && <CollectionDescription />}
        {isShowingComponent(itemsState, 'products') && itemsState.payloadSettings.single && (
          <CollectionProducts />
        )}
      </CollectionProvider>
    </div>
  )
})

export { Collection }

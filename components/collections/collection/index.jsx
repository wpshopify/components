import React, { useContext } from 'react'

import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionsContext } from '../_state/context'
import { CollectionProvider } from './_state/provider'

import { isShowingComponent } from '../../../common/components'

function Collection({ payload }) {
   const [collectionsState] = useContext(CollectionsContext)

   return (
      <div className='wps-item'>
         <CollectionProvider payload={payload}>
            {isShowingComponent(collectionsState, 'image') && <CollectionImage />}
            {isShowingComponent(collectionsState, 'title') && <CollectionTitle />}
            {isShowingComponent(collectionsState, 'description') && <CollectionDescription />}
         </CollectionProvider>
      </div>
   )
}

export { Collection }

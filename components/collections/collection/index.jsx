import React, { useContext } from 'react'

import { CollectionImage } from './image'
import { CollectionTitle } from './title'
import { CollectionDescription } from './description'
import { CollectionsContext } from '../_state/context'
import { CollectionProvider } from './_state/provider'

import { isShowingComponent } from '../../../common/components'
import { Products } from '../../products'

function Collection({ payload }) {
   const [collectionsState] = useContext(CollectionsContext)

   const productOptions = {
      payload: collectionsState.payload[0].products,
      componentOptions: { ...collectionsState.componentOptions.products },
      element: false
   }

   console.log('productOptions ::::::::::::::', productOptions)

   return (
      <div className='wps-item'>
         <CollectionProvider payload={payload}>
            {isShowingComponent(collectionsState, 'image') && <CollectionImage />}
            {isShowingComponent(collectionsState, 'title') && <CollectionTitle />}
            {isShowingComponent(collectionsState, 'description') && <CollectionDescription />}
            {collectionsState.componentOptions.single && <Products options={productOptions} />}
         </CollectionProvider>
      </div>
   )
}

export { Collection }

import React, { useContext } from 'react'
import { Collection } from './collection'
import uuidv4 from 'uuid/v4'

import { CollectionsProvider } from './_state/provider'
import { PaginationItemsContext } from '../pagination/items/_state/context'

function Collections({ options }) {
   const [paginationItemsState] = useContext(PaginationItemsContext)

   return (
      <>
         <CollectionsProvider options={options}>
            {paginationItemsState.payload.map(item => (
               <Collection key={uuidv4()} payload={item} />
            ))}
         </CollectionsProvider>
      </>
   )
}

export { Collections }

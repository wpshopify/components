import React from 'react'
import { Collection } from './collection'
import { Pagination } from '../pagination'
import { CollectionsProvider } from './_state/provider'

function Collections({ options }) {
   console.log('<Collections > </Collections>options .. ', options)

   return (
      <>
         <CollectionsProvider options={options}>
            <Pagination options={options}>
               <Collection />
            </Pagination>
         </CollectionsProvider>
      </>
   )
}

export { Collections }

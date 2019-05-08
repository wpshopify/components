import React from 'react'
import { ItemsProvider } from './_state/provider'
import { ItemsWrapper } from './wrapper'
import { Notice } from '../notice'
import has from 'lodash/has'

function hasItems(options) {
   return options.payload.length > 0
}

function skippingInitialLoad(options) {
   if (!has(options, 'skipInitialLoad')) {
      return false
   }

   return options.skipInitialLoad
}

/*

Handle the errors differently ...

*/
function hasItemsToShow(options) {
   if (!options) {
      return false
   }

   if (has(options, 'errors')) {
      return false
   }

   if (!has(options, 'payload')) {
      return true
   }

   if (hasItems(options) || skippingInitialLoad(options)) {
      console.log('<App/> :: Payload is NOT empty, has items to show')
      return true
   } else {
      console.log('<App/> :: Payload is empty, nothing to show')
      return false
   }
}

/*

Responsible for managing state of 'payload', 'queryParams', and 'isLoading'.
Connects sibling components together like Filters, Search and Pagination.

*/
function Items({ options, children }) {
   return (
      hasItemsToShow(options) && (
         <ItemsProvider options={options}>
            <ItemsWrapper>{children}</ItemsWrapper>
         </ItemsProvider>
      )
   )
}

export { Items }

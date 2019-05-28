import React, { useContext, useEffect, useRef } from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { ShopContext } from '../shop/_state/context'
import { Notice } from '../notice'
import isEmpty from 'lodash/isEmpty'

function Pagination({ children }) {
   const [shopState] = useContext(ShopContext)
   const [itemsState] = useContext(ItemsContext)

   function isHidingPagination() {
      if (shopState.settings.hidePagination) {
         return true
      }

      if (itemsState.componentOptions.pagination) {
         return false
      } else {
         return true
      }
   }

   return (
      <PaginationProvider options={itemsState}>
         {isEmpty(itemsState.payload) && !itemsState.isLoading ? <Notice message={itemsState.noResultsText} type='info' /> : <PaginationItems>{children}</PaginationItems>}

         {!isHidingPagination() && <PaginationControls />}
      </PaginationProvider>
   )
}

export { Pagination }

import React, { useContext } from 'react'
import { PaginationControls } from './controls'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notice } from '../notices/notice'
import { Notices } from '../notices'
import isEmpty from 'lodash/isEmpty'

function Pagination({ children, shopSettings, miscDispatch }) {
   const [itemsState] = useContext(ItemsContext)

   function isHidingPagination() {
      if (shopSettings.hidePagination) {
         return true
      }

      if (itemsState.componentOptions.pagination) {
         return false
      } else {
         return true
      }
   }

   function showNotices() {
      if (isEmpty(itemsState.payload) && !itemsState.isLoading) {
         return true
      }

      return false
   }

   return (
      <PaginationProvider options={itemsState}>
         {!isEmpty(itemsState.notices) && <Notices notices={itemsState.notices} dropzone={document.querySelector(itemsState.componentOptions.dropzoneNotices)} noticeGroup='storefront' />}

         {showNotices() ? <Notice message={itemsState.noResultsText} type='info' /> : <PaginationItems alignHeight={shopSettings.layout.alignHeight}>{children}</PaginationItems>}

         {!isHidingPagination() && <PaginationControls miscDispatch={miscDispatch} />}
      </PaginationProvider>
   )
}

export { Pagination }

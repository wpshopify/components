import React, { useContext, useEffect, useRef } from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notice } from '../notice'
import isEmpty from 'lodash/isEmpty'

function Pagination({ children }) {
   const [itemsState] = useContext(ItemsContext)
   const isFirstRender = useRef(true)

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }
   })

   return usePortal(
      <PaginationProvider options={itemsState}>
         {itemsState.componentOptions.skipInitialRender && isFirstRender.current ? (
            ''
         ) : isEmpty(itemsState.payload) && !itemsState.isLoading ? (
            <Notice message={itemsState.noResultsText} type='info' />
         ) : (
            <PaginationItems>{children}</PaginationItems>
         )}

         {itemsState.componentOptions.pagination && <PaginationControls />}
      </PaginationProvider>
   )
}

export { Pagination }

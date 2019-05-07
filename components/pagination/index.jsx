import React, { useContext } from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notice } from '../notice'
import isEmpty from 'lodash/isEmpty'

function Pagination({ children }) {
   const [itemsState] = useContext(ItemsContext)

   return usePortal(
      <PaginationProvider options={itemsState}>
         {isEmpty(itemsState.payload) ? <Notice message={itemsState.noResultsText} type='info' /> : <PaginationItems>{children}</PaginationItems>}

         {itemsState.componentOptions.pagination && <PaginationControls />}
      </PaginationProvider>
   )
}

export { Pagination }

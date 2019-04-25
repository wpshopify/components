import React, { useContext } from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { PaginationItemsProvider } from './items/_state/provider'

function Pagination({ options, children }) {
   return usePortal(
      <PaginationProvider options={options}>
         <PaginationItemsProvider options={options}>
            <section className='wps-items-wrapper'>
               <PaginationItems>{children}</PaginationItems>

               {options.componentOptions.pagination && <PaginationControls />}
            </section>
         </PaginationItemsProvider>
      </PaginationProvider>,
      options.element
   )
}

export { Pagination }

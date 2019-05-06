import React from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import isEmpty from 'lodash/isEmpty'
import { Notice } from '../notice'

function Pagination({ options, children }) {
   console.log('Pagination options', options)

   return usePortal(
      <PaginationProvider options={options}>
         <section className='wps-items-wrapper wps-container-fluid'>
            {isEmpty(options.payload) ? <Notice message={options.noResultsText} type='warning' /> : <PaginationItems>{children}</PaginationItems>}

            {options.componentOptions.pagination && <PaginationControls />}
         </section>
      </PaginationProvider>,
      options.element
   )
}

export { Pagination }

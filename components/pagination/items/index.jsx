import React, { useContext } from 'react'
import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'

function PaginationItems({ children }) {
   const [itemsState] = useContext(ItemsContext)
   const [paginationState] = useContext(PaginationContext)
   console.log('PaginationItems', itemsState)

   function mapPayload() {
      return itemsState.payload.map(item => React.cloneElement(children, { payload: item, key: uuidv4() }))
   }
   return (
      <section className={'wps-items-wrapper wps-container-fluid'}>
         <section className='wps-items wps-items-list wps-row' data-item-is-loading={itemsState.isLoading}>
            {mapPayload()}
         </section>

         {paginationState.controlsTouched && !itemsState.hasMoreItems ? <Notice message='No items left' type='info' /> : ''}
      </section>
   )
}

export { PaginationItems }

import React, { useContext } from 'react'
import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { ShopContext } from '../../shop/_state/context'

import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'

function PaginationItems({ children }) {
   const [itemsState] = useContext(ItemsContext)
   const [paginationState] = useContext(PaginationContext)
   const [shopState] = useContext(ShopContext)

   console.log('shopState.settings.layout.alignHeight', shopState.settings.layout.alignHeight);
   

   function mapPayload() {
      return itemsState.payload.map(item => {
         return React.cloneElement(children, { payload: item, key: uuidv4() })
      })
   }

   return (
      <section className={'wps-items-wrapper container-fluid'}>
         <section className='wps-items wps-items-list row' data-item-is-loading={itemsState.isLoading} data-is-align-height={shopState.settings.layout.alignHeight}>
            {mapPayload()}
         </section>

         {paginationState.controlsTouched && !itemsState.hasMoreItems ? <Notice message='No items left' type='info' /> : ''}
      </section>
   )
}

export { PaginationItems }

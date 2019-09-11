import React, { useContext } from 'react'
import { PaginationContext } from '../_state/context'
import { ItemsContext } from '../../items/_state/context'
import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'
// import Masonry from 'react-masonry-css'

function PaginationItems({ children, alignHeight }) {
   const [itemsState] = useContext(ItemsContext)
   const [paginationState] = useContext(PaginationContext)

   function isFirstItem(i, lastPageIndex) {
      return i === lastPageIndex
   }

   function mapPayload() {
      var lastPageIndex = itemsState.payload.length - itemsState.queryParams.first

      return itemsState.payload.map((item, i) => {
         return React.cloneElement(children, { payload: item, key: uuidv4(), isFirstItem: isFirstItem(i, lastPageIndex) })
      })
   }
   console.log('itemsState.payload', itemsState.payload)

   return (
      <section className={'wps-items-wrapper container-fluid'}>
         <section className='wps-items wps-items-list row' data-item-is-loading={itemsState.isLoading} data-is-align-height={alignHeight}>
            {/* <Masonry className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
               
            </Masonry> */}

            {mapPayload()}
         </section>

         {paginationState.controlsTouched && !itemsState.hasMoreItems ? <Notice message={itemsState.noResultsText} type='info' /> : ''}
      </section>
   )
}

export { PaginationItems }

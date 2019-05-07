import React, { useContext } from 'react'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'

function SearchLoader() {
   const [itemsState] = useContext(ItemsContext)

   return usePortal(itemsState.isLoading && <p className='wps-loader'>Loading ⌛️</p>, document.querySelector(itemsState.componentOptions.dropzoneLoader))
}

export { SearchLoader }

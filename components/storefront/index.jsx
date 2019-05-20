import React, { useContext } from 'react'
import { ItemsContext } from '../items/_state/context'
import { StorefrontProvider } from './_state/provider'
import { StorefrontSelections } from './selections'
import { StorefrontOptions } from './options'
import { StorefrontSorting } from './sorting'
import { StorefrontItems } from './items'
import { Loader } from '../loader'

function Storefront() {
   const [itemsState] = useContext(ItemsContext)

   return (
      <StorefrontProvider options={itemsState}>
         {itemsState.componentOptions.dropzoneSelections ? <StorefrontSelections /> : ''}
         {itemsState.componentOptions.dropzoneSorting ? <StorefrontSorting /> : ''}
         <StorefrontOptions />
         <Loader isLoading={itemsState.isLoading} dropzone={itemsState.componentOptions.dropzoneLoader} color='#ddd' />
         <StorefrontItems />
      </StorefrontProvider>
   )
}

export { Storefront }

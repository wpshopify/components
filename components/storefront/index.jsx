import React, { useContext } from 'react'
import { ItemsContext } from '../items/_state/context'
import { StorefrontProvider } from './_state/provider'
import { StorefrontSelections } from './selections'
import { StorefrontOptions } from './options'
import { StorefrontSorting } from './sorting'
import { StorefrontItems } from './items'

function Storefront() {
   const [itemsState] = useContext(ItemsContext)

   return (
      <StorefrontProvider options={itemsState}>
         {itemsState.componentOptions.dropzoneSelections ? <StorefrontSelections /> : ''}
         {itemsState.componentOptions.dropzoneSorting ? <StorefrontSorting /> : ''}
         <StorefrontOptions />
         <StorefrontItems />
      </StorefrontProvider>
   )
}

export { Storefront }

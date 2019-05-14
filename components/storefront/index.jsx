import React, { useContext } from 'react'
import { ItemsContext } from '../items/_state/context'
import { StorefrontProvider } from './_state/provider'
import { StorefrontSelections } from './selections'
import { StorefrontOptions } from './options'
import { StorefrontSorting } from './sorting'
import { StorefrontItems } from './items'
import { StorefrontLoader } from './loader'

function Storefront() {
   const [itemsState] = useContext(ItemsContext)

   console.log('STOREFRONT ITEMS', itemsState)

   return (
      <StorefrontProvider options={itemsState}>
         {itemsState.componentOptions.dropzoneSelections ? <StorefrontSelections /> : ''}
         {itemsState.componentOptions.dropzoneSorting ? <StorefrontSorting /> : ''}
         <StorefrontOptions />
         <StorefrontLoader />
         <StorefrontItems />
      </StorefrontProvider>
   )
}

export { Storefront }

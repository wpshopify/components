import React from 'react'
import { StorefrontOptionsProvider } from './_state/provider'
import { StorefrontOptionsWrapper } from './wrapper'

function StorefrontOptions() {
   return (
      <StorefrontOptionsProvider>
         <StorefrontOptionsWrapper />
      </StorefrontOptionsProvider>
   )
}

export { StorefrontOptions }

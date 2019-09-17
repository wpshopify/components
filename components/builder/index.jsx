import React from 'react'
import { BuilderProvider } from './_state/provider'
import { BuilderWrapper } from './wrapper'

function ShortcodeBuilder() {
   return (
      <BuilderProvider>
         <BuilderWrapper />
      </BuilderProvider>
   )
}
export { ShortcodeBuilder }

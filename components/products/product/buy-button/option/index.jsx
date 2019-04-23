import React, { useState, useEffect, useContext, useRef } from 'react'
import { ProductOptionProvider } from './_state/provider.jsx'
import { ProductOptionDropdown } from './dropdown'

function ProductOption({ option }) {
   const dropdownElement = useRef()

   return (
      <ProductOptionProvider
         options={{
            option: option,
            dropdownElement: dropdownElement
         }}>
         <ProductOptionDropdown />
      </ProductOptionProvider>
   )
}

export { ProductOption }

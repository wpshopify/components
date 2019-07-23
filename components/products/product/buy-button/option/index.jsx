import React, { useRef } from 'react'
import { ProductOptionProvider } from './_state/provider.jsx'
const ProductOptionDropdown = React.lazy(() => import(/* webpackChunkName: 'ProductOptionDropdown' */ './dropdown'))

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

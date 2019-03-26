import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../context'

function usePortal(component, componentID) {
   return <>{ReactDOM.createPortal(component, document.querySelector('[data-wps-component-id="' + componentID + '"]'))}</>
}

function ProductTitle() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)

   useState(() => {
      productState.element.setAttribute('data-wps-is-ready', '1')
   }, [])

   return usePortal(
      <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
         <h2 itemProp='name' className='wps-products-title' data-wps-is-ready={shopState.isReady ? '1' : '0'}>
            {productState.product.title}
         </h2>
      </div>,
      productState.componentID
   )
}

export { ProductTitle }

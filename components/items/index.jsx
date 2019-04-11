import React, { useState, useRef, useEffect, useContext } from 'react'
import { Product } from '../products/product'
import size from 'lodash/size'
import { LoadingContext } from '../../common/state/context'
import { Notice } from '../notice'

function hasItems(items) {
   return size(items) !== 0 ? true : false
}

function Items({ items }) {
   const [isActive, setIsActive] = useState(0)
   const isFirstRender = useRef(true)
   // const { isLoading } = useContext(LoadingContext)

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      // resetAllOtherDropzones()
      setIsActive(1)
   }, [items])

   // function resetAllOtherDropzones() {
   //    var elss = document.querySelectorAll('.wps-dropzone')

   //    if (elss) {
   //       elss.forEach(el => {
   //          var osdf = el.getAttribute('data-wps-dropzone-for')

   //          if (osdf !== from) {
   //             el.setAttribute('data-wps-dropzone-is-active', '0')
   //          } else {
   //             el.setAttribute('data-wps-dropzone-is-active', '1')
   //          }
   //       })
   //    }
   // }

   function buildOptions(item) {
      return {
         product: item,
         componentID: false,
         element: false,
         gid: false,
         excludes: false,
         renderFromServer: false,
         selectedVariant: false,
         componentOptions: false
      }
   }

   return (
      <section className='wps-dropzone' data-wps-dropzone-is-active={isActive}>
         {!hasItems(items) ? <Notice type='info' message='No results found' /> : items.map(item => <Product key={item.id} options={buildOptions(item)} />)}
      </section>
   )
}

export { Items }

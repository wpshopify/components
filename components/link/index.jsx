import React from 'react'
import { getItemLink, singleIsShopify } from '../../common/settings'

function Link({ type, payload, classNames = '', target, shop, children }) {
   const className = 'wps-' + type + '-link' + ' ' + classNames

   function getTarget(target) {
      if (target) {
         return target
      }

      if (singleIsShopify()) {
         return '_blank'
      } else {
         return '_self'
      }
   }

   return (
      <>
         <a href={getItemLink(payload, shop, type)} className={className} target={getTarget(target)}>
            {children}
         </a>
      </>
   )
}

export { Link }

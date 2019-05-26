import React from 'react'
import { getItemLink } from '../../common/settings'

function Link({ type, payload, classNames, target, children }) {
   const className = 'wps-' + type + '-link' + ' ' + classNames

   if (classNames === 'wps-cart-lineitem-img-link') {
      console.log('payload, ', payload)
   }
   return (
      <>
         <a href={getItemLink(payload)} className={className} target={target ? target : '_self'}>
            {children}
         </a>
      </>
   )
}

export { Link }

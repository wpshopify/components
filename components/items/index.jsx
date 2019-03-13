import React, { useState, useRef, useEffect, useContext } from 'react';
import { Product } from '../products/product';
import size from 'lodash/size';
import { LoadingContext } from '../../common/state/context';


function Items({ items, from }) {

   const [isActive, setIsActive] = useState(0);
   const isFirstRender = useRef(true);
   const { isLoading } = useContext(LoadingContext);


   function hasItems(items) {
      return size(items) !== 0 ? true : false;
   }



   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      resetAllOtherDropzones();
      setIsActive(1);

   }, [items]);




   function resetAllOtherDropzones() {

      var elss = document.querySelectorAll('.wps-dropzone');

      if (elss) {

         elss.forEach((el) => {

            var osdf = el.getAttribute('data-wps-dropzone-for');

            if (osdf !== from) {
               el.setAttribute('data-wps-dropzone-is-active', '0');
            } else {
               el.setAttribute('data-wps-dropzone-is-active', '1');
            }

         });
      }

   }



   return (
      <section className="wps-dropzone" data-wps-dropzone-for={from} data-wps-dropzone-is-active={isActive}>
         {
            !hasItems(items)
               ? <p>No results found</p>
               : items.map(item => (
                  <Product key={item.id} product={item} isLoading={isLoading}></Product>
               ))
         }
      </section>
   )

}

export {
   Items
}

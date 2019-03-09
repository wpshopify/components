import React, { useState, useEffect } from 'react';
import { ProductVariants } from '../variants';
import { addLineItems } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';

const ProductOptionContext = React.createContext();

function getLineItemsToAdd() {
   return [
      { variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5 }
   ];
}

function ProductOption({ option, isLoading, product }) {

   const [isOpen, setIsOpen] = useState(false);
   const [isOptionSelected, setIsOptionSelected] = useState(false);



   useEffect(() => {
      console.log('isOptionSelected ', isOptionSelected);
      // setIsOptionSelected(!isOptionSelected);
   }, [isOptionSelected]);


   async function toggleVariantsModal() {

      console.log('option ', option);
      console.log('product ', product);

      setIsOpen(!isOpen);




      const lineItems = getLineItemsToAdd();

      try {
         const result = await addLineItems(lineItems);
         console.log('result ', result.userErrors[0].message);

      } catch (errrr) {
         console.log('errrr ', errrr);
      }



   }

   return (

      <ProductOptionContext.Provider value={{
         isOptionSelected: isOptionSelected,
         setIsOptionSelected: setIsOptionSelected
      }}>

         <div
            className="wps-btn-dropdown wps-col wps-col-1"
            data-wps-is-selected={isOptionSelected}>

            <a
               href="#!"
               className="wps-btn wps-icon wps-icon-dropdown wps-modal-trigger"
               data-option=""
               data-option-id=""
               data-wps-is-ready={isLoading ? '0' : '1'}
               onClick={toggleVariantsModal}>

               {option.name}

            </a>

            <ProductVariants
               setIsOpen={setIsOpen}
               isOpen={isOpen}
               option={option}
               toggleVariantsModal={toggleVariantsModal} />

         </div>

      </ProductOptionContext.Provider>

   )

}

export {
   ProductOption,
   ProductOptionContext
}

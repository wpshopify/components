import React, { useState, useEffect, useContext, useRef } from 'react';
import { ProductVariants } from '../variants';
import { addLineItems } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';
import find from 'lodash/find';
import { ProductBuyButtonContext } from '../buy-button';
import anime from 'animejs/lib/anime.es.js';




function pulse(element) {
   console.log('element ', element);

   anime({
      targets: element,
      scale: 1.09,
      duration: 300,
      elasticity: 0,
      complete: function () {

         anime({
            targets: element,
            scale: 1,
            duration: 800,
            elasticity: 800
         });

      }
   });

}







const ProductOptionContext = React.createContext();

function getLineItemsToAdd() {
   return [
      { variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTEwNjAyMjc5Mg==', quantity: 5 }
   ];
}


function getOptionName(selectedOption, option) {
   return selectedOption[option.name];
}














function ProductOption({ option }) {

   const [isOpen, setIsOpen] = useState(false);
   const [isOptionSelected, setIsOptionSelected] = useState(false);
   const [selectedOption, setSelectedOption] = useState({});
   const dropdown = useRef();
   const isFirstRender = useRef(true);

   const { isLoading, availableVariants, missingSelections } = useContext(ProductBuyButtonContext);



   function toggleDropdown(e) {
      setIsOpen(!isOpen);
   }

   function removeEvents() {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEsc, false);
   }


   function handleOutsideClick(e) {

      if (!dropdown.current.contains(e.target)) {

         setIsOpen(false);
         removeEvents();

      }

   }


   function handleEsc(event) {

      if (event.keyCode === 27) {

         setIsOpen(false);
         removeEvents();

      }

   }



   useEffect(() => {

      console.log('isOptionSelected ', selectedOption);
      // console.log('option', option);
      console.log('availableVariants ', availableVariants);

      var found = find(availableVariants, selectedOption);
      console.log('foundfound ', found);

      if (found === undefined) {
         setIsOptionSelected(false);
      }


   }, [availableVariants]);


   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // add when mounted
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEsc, false);

      // return function to be called when unmounted
      return () => {
         removeEvents();
      }

   }, [isOpen]);






   useEffect(() => {

      if (isFirstRender.current) {
         console.log('missingSelections first');

         isFirstRender.current = false;
         return;
      }

      if (!missingSelections) {
         console.log('missingSelections returned');
         return;
      }
      console.log('missingSelections more', missingSelections);

      if (!isOptionSelected) {
         console.log('NOT SELECTED: ', isOptionSelected);
         pulse(dropdown.current);
      }

   }, [missingSelections]);


   return (

      <ProductOptionContext.Provider value={{
         isOptionSelected: isOptionSelected,
         setIsOptionSelected: setIsOptionSelected,
         option: option,
         selectedOption: selectedOption,
         setSelectedOption: setSelectedOption,
         toggleDropdown: toggleDropdown
      }}>

         <div
            className="wps-btn-dropdown wps-col wps-col-1"
            data-wps-is-selected={isOptionSelected}
            ref={dropdown}>

            <a
               href="#!"
               className="wps-btn wps-icon wps-icon-dropdown wps-modal-trigger"
               data-option=""
               data-option-id=""
               data-wps-is-ready={isLoading ? '0' : '1'}
               onClick={toggleDropdown}>

               {!isOptionSelected ? option.name : option.name + ': ' + getOptionName(selectedOption, option)}

            </a>

            <ProductVariants
               dropdown={dropdown}
               setIsOpen={setIsOpen}
               isOpen={isOpen}
               option={option} />

         </div>

      </ProductOptionContext.Provider>

   )

}

export {
   ProductOption,
   ProductOptionContext
}

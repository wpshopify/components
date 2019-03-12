import React, { useState, useEffect, useContext, useRef } from 'react';
import { ProductVariants } from '../variants';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { ProductBuyButtonContext } from '../buy-button/context';
import { pulse } from '../../../common/animations';


const ProductOptionContext = React.createContext();

function ProductOption({ option }) {

   const [isOpen, setIsOpen] = useState(false);
   const [isOptionSelected, setIsOptionSelected] = useState(false);
   const [selectedOption, setSelectedOption] = useState({});
   const dropdown = useRef();
   const dropdownTrigger = useRef();
   const isFirstRender = useRef(true);
   const { state, dispatch } = useContext(ProductBuyButtonContext);


   function getOptionName(selectedOption, option) {
      return selectedOption[option.name];
   }

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


   /*
   
   When state.availableVariants changes ...
   
   */
   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      var optionIsAvailable = find(state.availableVariants, selectedOption);

      if (optionIsAvailable === undefined) {

         setIsOptionSelected(false);

         dispatch({ type: "UNSET_SELECTED_OPTIONS", payload: option.name });

      }

   }, [state.availableVariants]);



   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      // console.log('state.allOptionsSelected', state.allOptionsSelected);
      // console.log('state.selectedOptions ', state.selectedOptions);

      if (isEmpty(state.selectedOptions)) {
         setIsOptionSelected(false);
      }

   }, [state.selectedOptions]);


   /*
   
   When isOpen changes ...
   
   */
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



   /*

   When state.missingSelections changes ...

   */
   useEffect(() => {

      if (isFirstRender.current) {
         isFirstRender.current = false;
         return;
      }

      if (!state.missingSelections) {
         return;
      }

      if (!isOptionSelected) {
         pulse(dropdownTrigger.current, () => dispatch({ type: "SET_MISSING_SELECTIONS", payload: false }));
      }

   }, [state.missingSelections]);


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
               data-wps-is-ready={state.isLoading ? '0' : '1'}
               onClick={toggleDropdown}
               ref={dropdownTrigger}>

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

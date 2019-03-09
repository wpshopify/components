import React, { useState } from 'react';
import { ProductQuantity } from '../quantity';
import { ProductOptions } from '../options';
import { ProductAddButton } from '../add-button';

const ProductBuyButtonContext = React.createContext();

function ProductBuyButton({ product, isLoading }) {

   const [allOptionsSelected, setAllOptionsSelected] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState({});
   const [availableVariants, setAvailableVariants] = useState([]);
   const [missingSelections, setMissingSelections] = useState(false);

   return (
      <div className="wps-buy-button-wrapper">

         <ProductBuyButtonContext.Provider value={{
            selectedOptions: selectedOptions,
            setSelectedOptions: setSelectedOptions,
            availableVariants: availableVariants,
            setAvailableVariants: setAvailableVariants,
            allOptionsSelected: allOptionsSelected,
            setAllOptionsSelected: setAllOptionsSelected,
            missingSelections: missingSelections,
            setMissingSelections: setMissingSelections,
            product: product,
            isLoading: isLoading
         }}>

            <ProductQuantity />
            <ProductOptions />
            <ProductAddButton />

         </ProductBuyButtonContext.Provider>

      </div>
   )

}

export {
   ProductBuyButton,
   ProductBuyButtonContext
}

import React, { useState } from 'react';
import { ProductOption } from '../option';

const ProductOptionsContext = React.createContext();

function ProductOptions({ product, isLoading }) {

   const [allOptionsSelected, setAllOptionsSelected] = useState(false);
   const [selectedOptions, setSelectedOptions] = useState([]);


   useEffect(() => {

      console.log('selectedOptions ', selectedOptions);

   }, [selectedOptions]);


   return (

      <ProductOptionsContext.Provider value={{
         selectedOptions: selectedOptions,
         setSelectedOptions: setSelectedOptions
      }}>

         <div
            className="wps-component wps-component-products-options"
            data-wps-is-component-wrapper
            data-wps-product-id={product.id}
            data-wps-post-id=""
            data-wps-ignore-sync="1">

            {product.options.map(option => <ProductOption key={option.id} option={option} isLoading={isLoading} product={product}></ProductOption>)}

         </div>

      </ProductOptionsContext.Provider>

   )

}

export {
   ProductOptions
}
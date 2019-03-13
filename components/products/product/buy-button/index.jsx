import React, { useState, useReducer, useContext } from 'react';
import { ProductQuantity } from '../quantity';
import { ProductOptions } from '../options';
import { ProductAddButton } from '../add-button';

import { ProductBuyButtonReducer } from '../../../../common/state/reducer/buy-button';
import { getProductBuyButtonInitialState } from './state';
import { ProductBuyButtonContext } from './context';

function ProductBuyButton(props) {

   const [state, dispatch] = useReducer(ProductBuyButtonReducer, getProductBuyButtonInitialState(props));

   return (
      <div className="wps-buy-button-wrapper">

         <ProductBuyButtonContext.Provider value={{
            buyButtonState: state,
            buyButtonDispatch: dispatch
         }}>

            <ProductQuantity />
            <ProductOptions />
            <ProductAddButton />

         </ProductBuyButtonContext.Provider>

      </div>
   )

}

export {
   ProductBuyButton
}

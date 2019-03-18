import React, { useReducer, useContext } from 'react';
import { ProductQuantity } from '../quantity';
import { ProductOptions } from '../options';
import { ProductAddButton } from '../add-button';
import { ProductNotice } from '../notice';
import { ProductNoticeOutOfStock } from '../notice/out-of-stock';

import { ProductBuyButtonReducer } from './reducer';
import { getProductBuyButtonInitialState } from './initial-state';
import { ProductBuyButtonContext } from './context';
import { ProductContext } from '../context';

function ProductBuyButton(props) {

   const { productState } = useContext(ProductContext);
   const [state, dispatch] = useReducer(ProductBuyButtonReducer, getProductBuyButtonInitialState(productState.product, props));

   return (
      <div className="wps-buy-button-wrapper">

         <ProductBuyButtonContext.Provider value={{
            buyButtonState: state,
            buyButtonDispatch: dispatch
         }}>

            {
               productState.product.availableForSale
                  ? <> <ProductQuantity /> <ProductOptions /> <ProductAddButton /> </>
                  : <ProductNotice type="warning"> <ProductNoticeOutOfStock /> </ProductNotice>
            }

         </ProductBuyButtonContext.Provider>

      </div>
   )

}

export {
   ProductBuyButton
}

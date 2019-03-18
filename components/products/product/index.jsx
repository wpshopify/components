import 'babel-polyfill';
import React, { useReducer } from 'react';
import { ProductTitle } from './title';
import { ProductPricing } from './pricing';
import { ProductDescription } from './description';
import { ProductBuyButton } from './buy-button';
import { ProductImages } from './images';
import { ProductReducer } from './reducer';
import { ProductContext } from './context';
import { getProductInitialState } from './initial-state';

function Product({ product }) {
	const [ state, dispatch ] = useReducer(ProductReducer, getProductInitialState(product));

	return (
		<div className="wps-product">
			<ProductContext.Provider
				value={{
					productState: state,
					productDispatch: dispatch
				}}
			>
				<ProductImages />
				<ProductTitle />
				<ProductPricing />
				<ProductDescription />
				<ProductBuyButton />
			</ProductContext.Provider>
		</div>
	);
}

export { Product };

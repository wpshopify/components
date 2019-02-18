import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import sortedUniq from 'lodash/sortedUniq';
import sortBy from 'lodash/sortBy';
import { ProductContext } from '../index';
import { getPrices } from '../../../common/pricing/data';
import { formatPriceToCurrency } from '../../../common/pricing/formatting';



function ProductPricing() {

	const product = useContext(ProductContext);
	const newPrices = getPrices(product);

	return (

		<div
			className="wps-component wps-component-products-pricing"
			data-wps-is-component-wrapper
			data-wps-product-id={product.id}
			data-wps-post-id=""
			data-wps-is-lite-sync="1"
			data-wps-is-showing-compare-at=""
			data-wps-is-showing-local=""
			data-wps-is-showing-price-range="">

			<h3
				itemProp="offers"
				itemScope
				itemType="https://schema.org/Offer"
				className="wps-products-price wps-product-pricing wps-products-price-one">

				<div className="wps-price-wrapper"
					data-wps-is-ready="1"
					data-wps-is-multi-price="0"
					data-wps-is-price-wrapper="1">

					{formatPriceToCurrency(newPrices[0])}

				</div>

			</h3>

		</div>

	)

}

export default ProductPricing;
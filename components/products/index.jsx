import React, { useState, useEffect } from 'react';
import { Product } from './product';

function Products({ products }) {
	console.log('<Products /> ', products);

	return (
		<section className="wps-products">
			{products.products.map((product) => <Product key={product.id} product={product} />)}
		</section>
	);
}

export { Products };

import React, { useContext, useEffect, useState, useRef } from 'react';
import { ProductFeaturedImage } from './featured';
import { ProductGallery } from './gallery';
import { ProductContext } from '../context';

function ProductImages() {
	const paneElement = useRef();
	const { productState } = useContext(ProductContext);

	function hasManyImages(product) {
		return productState.product.images.length > 1;
	}

	return (
		<div className="wps-component wps-component-products-images" ref={paneElement}>
			{hasManyImages(productState.product) ? (
				<ProductGallery paneElement={paneElement} />
			) : (
				<ProductFeaturedImage />
			)}
		</div>
	);
}

export { ProductImages };

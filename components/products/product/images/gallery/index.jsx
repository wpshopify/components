import React, { useContext, useEffect, useState, useRef } from 'react';
import { ProductContext } from '../../context';
import { ProductThumbnailImage } from '../thumbnail';
import { ProductFeaturedImage } from '../featured';

function ProductGallery({ paneElement }) {
	const { productState } = useContext(ProductContext);

	function isFeatImage(index) {
		return index === 0 ? true : false;
	}

	return productState.product.images.map(
		(image, index) =>
			isFeatImage(index) ? (
				<ProductFeaturedImage key={image.id} image={image} paneElement={paneElement} />
			) : (
				<ProductThumbnailImage key={image.id} image={image} />
			)
	);
}

export { ProductGallery };

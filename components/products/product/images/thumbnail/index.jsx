import React, { useContext, useEffect, useState, useRef } from 'react';
import { ProductImage } from '../image';

function ProductThumbnailImage({ image }) {
	console.log('image', image);

	function handleThumbnailClick() {
		console.log('Clicked', image);
	}

	return (
		<div className="wps-component wps-component-products-images-thumbnail" onClick={handleThumbnailClick}>
			<ProductImage isFeatured={false} image={image} />
		</div>
	);
}

export { ProductThumbnailImage };

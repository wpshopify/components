import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../../../../shop/context';
import Drift from 'drift-zoom';

function ProductImage({ isFeatured, image, paneElement }) {
	const { shopState } = useContext(ShopContext);
	const imageRef = useRef();

	useEffect(() => {
		if (isFeatured) {
			if (paneElement) {
				console.log('imageRef.current', imageRef.current);
				console.log('paneElement', paneElement.current);

				new Drift(imageRef.current, {
					paneContainer: paneElement.current,
					inlinePane: false
				});
			}
		}
	}, []);

	return (
		<img
			ref={imageRef}
			itemProp="image"
			src={image.src}
			className="wps-product-image"
			alt={image.altText}
			data-wps-is-ready={shopState.isReady ? '1' : '0'}
			data-zoom={image.src}
		/>
	);
}

export { ProductImage };

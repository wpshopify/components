import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../../../../shop/context';
import Drift from 'drift-zoom';

function ProductImage({ isFeatured, image, paneElement }) {
	const { shopState } = useContext(ShopContext);
	const imageRef = useRef();

	useEffect(() => {
		console.log('isFeatured', isFeatured);

		if (isFeatured) {
			if (paneElement) {
				new Drift(imageRef.current, {
					paneContainer: document.querySelector(
						'[data-wps-product-id="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIyMTY4MjU3MTY3ODQ="]'
					),
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

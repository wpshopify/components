import React, { useContext, useEffect, useState, useRef } from 'react';
import { ProductContext } from '../../context';
import { ProductImage } from '../image';

function getFeaturedImageFromProduct(product) {
	return product.images[0];
}

function getVariantImage(variant) {
	return variant.image;
}

function ProductFeaturedImage({ paneElement }) {
	const isFirstRender = useRef(true);
	const { productState } = useContext(ProductContext);

	const [ featImage, setFeatImage ] = useState(getFeaturedImageFromProduct(productState.product));

	console.log('<ProductFeaturedImage>');

	useEffect(
		() => {
			if (isFirstRender.current) {
				isFirstRender.current = false;
				return;
			}

			console.log('productState.selectedVariant', productState.selectedVariant);

			if (productState.selectedVariant) {
				setFeatImage(getVariantImage(productState.selectedVariant));
			}
		},
		[ productState.selectedVariant ]
	);

	return featImage ? (
		<div
			className="wps-component wps-component-products-images-featured"
			data-wps-is-component-wrapper
			data-wps-post-id=""
			data-wps-ignore-sync="1"
		>
			<div className="wps-product-image-wrapper">
				<ProductImage isFeatured={true} image={featImage} paneElement={paneElement} />
			</div>
		</div>
	) : (
		<span>No image found</span>
	);
}

export { ProductFeaturedImage };

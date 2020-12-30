/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function Img(props) {
  function isSelectedImage() {
    if (props.isFeatured) {
      return;
    }

    return props.galleryState.featImage.src === props.image.src;
  }

  const featThumbStyles = css`
    outline: 1px dashed #000000;
    outline-offset: 3px;
    transition: transform 100ms ease;
    max-width: 100%;
  `;

  const thumbnailStyles = css`
    display: block;
    margin-bottom: ${props.isFeatured ? '0px' : '10px'};
    max-width: 100%;

    &:focus,
    &:active {
      outline: ${props.isFeatured ? 'none' : '1px dashed #000000'};
      outline-offset: ${props.isFeatured ? 'none' : '3px'};
    }

    &:hover {
      cursor: ${props.isFeatured ? 'default' : 'pointer'};
    }
  `;

  return (
    <img
      css={isSelectedImage() ? featThumbStyles : thumbnailStyles}
      ref={props.imageRef}
      itemProp='image'
      src={props.productImageSrc}
      className='wps-product-image lazyload'
      alt={props.image.altText}
      data-zoom={props.image.src}
    />
  );
}

export default wp.element.memo(Img);
